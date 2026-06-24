const progressKey = "kimicode-course-completed-lesson";
const page = document.querySelector(".lesson-page");
const completeButton = document.querySelector("[data-complete-lesson]");

function getCompletedLesson() {
  return Number(localStorage.getItem(progressKey) || "0");
}

function setCompletedLesson(lesson) {
  localStorage.setItem(progressKey, String(Math.max(getCompletedLesson(), lesson)));
}

function updateLessonAccess() {
  if (!page) return;

  const lesson = Number(page.dataset.lesson || "1");
  const completed = getCompletedLesson();
  const isLocked = lesson > completed + 1;

  page.classList.toggle("is-locked", isLocked);

  if (completeButton) {
    completeButton.textContent = lesson <= completed ? "已完成，继续复习" : "完成本节，解锁下一节";
  }
}

completeButton?.addEventListener("click", () => {
  const lesson = Number(completeButton.dataset.completeLesson || "1");
  setCompletedLesson(lesson);
  updateLessonAccess();
});

updateLessonAccess();
