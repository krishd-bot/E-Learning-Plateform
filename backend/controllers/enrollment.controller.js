import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

export const enrollInCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  if (course.price > 0) {
    return next(
      new AppError(
        "This is a paid course, please complete checkout to enroll",
        402
      )
    );
  }

  const user = await User.findById(req.user.id);

  const alreadyEnrolled = user.enrolledCourses.some(
    (e) => e.course.toString() === courseId
  );

  if (alreadyEnrolled) {
    return next(new AppError("You are already enrolled in this course", 409));
  }

  user.enrolledCourses.push({ course: courseId });
  await user.save();

  course.numOfEnrollments += 1;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Enrolled successfully",
  });
});

export const getMyCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "enrolledCourses.course"
  );

  const myCourses = user.enrolledCourses.map((enrollment) => {
    const totalLectures = enrollment.course?.lectures?.length || 0;
    const completed = enrollment.completedLectures.length;
    const progress =
      totalLectures === 0 ? 0 : Math.round((completed / totalLectures) * 100);

    return {
      course: enrollment.course,
      enrolledAt: enrollment.enrolledAt,
      completedLectures: enrollment.completedLectures,
      progress,
      certificateIssued: enrollment.certificateIssued,
      certificateIssuedAt: enrollment.certificateIssuedAt,
    };
  });

  res.status(200).json({
    success: true,
    myCourses,
  });
});

export const markLectureComplete = asyncHandler(async (req, res, next) => {
  const { courseId, lectureId } = req.params;

  const user = await User.findById(req.user.id);
  const course = await Course.findById(courseId);

  if (!course) return next(new AppError("Course not found", 404));

  const enrollment = user.enrolledCourses.find(
    (e) => e.course.toString() === courseId
  );

  if (!enrollment) {
    return next(new AppError("You are not enrolled in this course", 403));
  }

  const alreadyDone = enrollment.completedLectures.some(
    (l) => l.lectureId === lectureId
  );

  if (!alreadyDone) {
    enrollment.completedLectures.push({ lectureId });
  }

  const totalLectures = course.lectures.length;
  const completed = enrollment.completedLectures.length;
  const progress =
    totalLectures === 0 ? 0 : Math.round((completed / totalLectures) * 100);

  let justIssued = false;
  if (progress === 100 && !enrollment.certificateIssued) {
    enrollment.certificateIssued = true;
    enrollment.certificateIssuedAt = new Date();
    justIssued = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Progress updated",
    progress,
    certificateIssued: enrollment.certificateIssued,
    justIssued,
  });
});

export const getCertificate = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user.id).populate(
    "enrolledCourses.course"
  );

  const enrollment = user.enrolledCourses.find(
    (e) => e.course._id.toString() === courseId
  );

  if (!enrollment) {
    return next(new AppError("You are not enrolled in this course", 403));
  }

  if (!enrollment.certificateIssued) {
    return next(
      new AppError("Complete all lectures to unlock your certificate", 400)
    );
  }

  res.status(200).json({
    success: true,
    certificate: {
      studentName: user.fullName,
      courseTitle: enrollment.course.title,
      issuedAt: enrollment.certificateIssuedAt,
      instructor: enrollment.course.createdByName,
    },
  });
});
