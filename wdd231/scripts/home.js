// Populate current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Populate last modified date
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "WDD 231", name: "Front-end Web Development I", credits: 2, type: "WDD", completed: true },
  { code: "WDD 232", name: "Front-end Web Development II", credits: 2, type: "WDD", completed: false },
  { code: "CSE 121b", name: "JavaScript Language", credits: 2, type: "CSE", completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
  { code: "CSE 110", name: "Intro to Problem Solving", credits: 2, type: "CSE", completed: true }
];

const courseContainer = document.getElementById("courses");
const creditTotal = document.getElementById("creditTotal");

function renderCourses(courseList) {
  courseContainer.innerHTML = "";
  let total = 0;

  courseList.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-card");
    if (course.completed) {
      div.classList.add("completed");
    }
    div.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;
    courseContainer.appendChild(div);
    total += course.credits;
  });

  creditTotal.textContent = total;
}

// Filter buttons
document.getElementById("all").addEventListener("click", () => renderCourses(courses));
document.getElementById("wdd").addEventListener("click", () => renderCourses(courses.filter(c => c.type === "WDD")));
document.getElementById("cse").addEventListener("click", () => renderCourses(courses.filter(c => c.type === "CSE")));

// Show all on load
renderCourses(courses);
