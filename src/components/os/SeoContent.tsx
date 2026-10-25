import { experienceData, aboutData } from "@/lib/data";
import { profile, projectsData, socials } from "@/lib/portfolio";

const period = (e: (typeof experienceData)[number]) =>
  [e.duration?.start, e.duration?.end].filter(Boolean).join(" – ").replace(/,/g, "");

// Server-rendered text version of the apps, for crawlers and screen readers.
// The OS shell renders on the client, so without this the HTML has no content.
export default function SeoContent() {
  const { college } = aboutData.education;
  return (
    <div className="sr-only">
      <h1>
        {profile.name}, {profile.role}
      </h1>
      <p>{profile.bio}</p>
      <p>Based in {aboutData.location}, India.</p>

      <section>
        <h2>Highlights</h2>
        <ul>
          {profile.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        {experienceData.map((e) => (
          <article key={`${e.companyName}-${e.roleName}`}>
            <h3>
              {e.roleName} at {e.companyName}
            </h3>
            <p>
              {e.jobType}, {e.type}, {period(e)}
            </p>
            <ul>
              {e.desc.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p>Tech: {e.skills.join(", ")}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projectsData.map((p) => (
          <article key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <p>Tech: {p.tags.join(", ")}</p>
            {p.link && <a href={p.link}>{p.name} source code on GitHub</a>}
          </article>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <p>{Array.from(new Set(experienceData.flatMap((e) => e.skills))).join(", ")}</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>
          {college.branch}, {college.name} ({college.years}), CGPA {college.cgpa}
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <ul>
          <li>
            <a href={`mailto:${socials.email}`}>{socials.email}</a>
          </li>
          <li>
            <a href={socials.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={socials.github}>GitHub</a>
          </li>
          <li>
            <a href={socials.resume}>Résumé</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
