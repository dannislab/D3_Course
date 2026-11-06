import data from "./data/students.js";
import Barplot from "./components/barplot.jsx";
import "./App.css";

function App() {
  const totalStudents = data.reduce((total, d) => total + d.students, 0);
  const totalCountries = data.length;
  const largestCohort = data.reduce((largest, country) =>
    country.students > largest.students ? country : largest,
  );

  return (
    <div>
      <div className="page-header">
        <a className="back-link" href="/D3_Course/">
          ← Back to the Sketchbook
        </a>

        <h1> Where students Come From </h1>
        <p>First cohort · Student enrolments by country</p>
      </div>
      <div className="summary-stats">
        <div className="stat-card">
          <p className="stat-label">REPORTED STUDENTS</p>
          <p className="stat-value">{totalStudents}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">COUNTRIES REPRESENTED</p>
          <p className="stat-value">{totalCountries}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">LARGEST COHORT</p>
          <p className="stat-value">{largestCohort.country}</p>
          <p className="stat-detail">{largestCohort.students} students</p>
        </div>
      </div>
      <div className="chart-section">
        <p className="section-label"> ENROLMENTS BY COUNTRY </p>
        <div className="chart-scroll">
          <Barplot data={data} />
        </div>
        <p className="chart-note">
          Source: D3 course, first cohort. Countries with at least 3 enrolled
          students.
        </p>
      </div>
    </div>
  );
}

export default App;
