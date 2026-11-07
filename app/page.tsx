import Image from 'next/image';
import Header from '@/components/Header';
import PageEffects from '@/components/PageEffects';
import Clock from '@/components/Clock';
import ContactForm from '@/components/ContactForm';
import CertificateButton from '@/components/CertificateButton';
import { contact, cvHref, ibmVerifyHref, projects, stack } from '@/lib/content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <PageEffects />

      <main id="main">
        <section className="hero" id="home">
          <div className="wrap hero-grid">
            <figure className="hero-photo">
              <Image
                src="/images/photo.jpg"
                alt="Portrait of Favour Akintade"
                width={720}
                height={900}
                sizes="(max-width: 960px) 100vw, 40vw"
                preload
              />
            </figure>
            <div className="hero-copy">
              <p className="label hero-meta">
                <span>Software developer</span>
                <span>Lagos, Nigeria</span>
                <span><Clock /> WAT</span>
              </p>
              <h1 className="hero-name" aria-label="Favour Akintade">
                <span className="line"><span>Favour</span></span>
                <span className="line"><span>Akintade</span></span>
              </h1>
              <div className="hero-foot">
                <p className="hero-thesis">
                  I build web experiences and mobile interfaces that make everyday tasks simpler.
                  Frontend, Flutter, and Java.
                </p>
                <div className="actions">
                  <a className="btn btn-solid" href="#work">See the work</a>
                  <a className="btn btn-line" href={cvHref} {...external}>Developer CV &#8599;</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="slab" id="work">
          <div className="wrap">
            <div className="section-head">
              <p className="label">Selected work</p>
              <h2 className="title">Four live products.</h2>
              <p className="lede">
                Everything else on this page is black and white. The colour belongs to the work.
              </p>
            </div>

            <div className="projects">
              {projects.map((p, i) => (
                <article className="project reveal" key={p.name}>
                  <a className="shot" href={p.url} {...external} tabIndex={-1} aria-hidden="true">
                    <Image
                      src={p.image}
                      alt=""
                      width={1440}
                      height={900}
                      sizes="(max-width: 960px) 100vw, 60vw"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </a>
                  <div className="project-copy">
                    <p className="label">{p.tag}</p>
                    <h3>
                      <a href={p.url} {...external}>
                        {p.name} <span aria-hidden="true">&#8599;</span>
                      </a>
                    </h3>
                    <p>{p.description}</p>
                    <ul className="tech">
                      {p.tech.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap about">
            <div className="about-head reveal">
              <p className="label">About</p>
              <h2 className="title">Software built around people.</h2>
            </div>
            <div className="about-copy reveal">
              <p>
                I’m <strong>Favour Oluwapamilerin Akintade</strong>, a software developer based in
                Lagos. I work on responsive web applications and Flutter interfaces, with a growing
                foundation in Java backend development.
              </p>
              <p>
                My project work spans an AI learning platform, a Nigerian-first AI dating platform, a
                trading alerts product, and a home-care storefront. I use React, Next.js, HTML, CSS,
                and JavaScript for the web, and Flutter and Dart for mobile.
              </p>
              <dl className="facts">
                <div><dt>Live projects</dt><dd>{projects.length}</dd></div>
                <div><dt>Web</dt><dd>React · Next.js</dd></div>
                <div><dt>Mobile</dt><dd>Flutter · Dart</dd></div>
                <div><dt>Backend</dt><dd>Java · Spring</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="rule-top" id="stack">
          <div className="wrap">
            <div className="section-head">
              <p className="label">Stack</p>
              <h2 className="title">What I build with.</h2>
            </div>
            <div className="stack">
              {stack.map((col) => (
                <div className="stack-col reveal" key={col.title}>
                  <h3>{col.title}</h3>
                  <ul>
                    {col.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <p className="tools">{col.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rule-top" id="credentials">
          <div className="wrap">
            <div className="section-head">
              <p className="label">Credentials</p>
              <h2 className="title">Training and documents.</h2>
            </div>
            <div className="creds">
              <article className="cred reveal">
                <p className="cred-when label">Jan 2026</p>
                <div className="cred-body">
                  <h3>IBM Java Developer Professional Certificate</h3>
                  <p>
                    IBM &amp; Coursera · 11 courses. Full-stack Java with Spring, cloud-native
                    architecture, Docker, microservices, DevOps, Git, relational and NoSQL
                    databases, and generative AI for software development.
                  </p>
                </div>
                <div className="cred-actions">
                  <CertificateButton
                    src="/cv/IBM_Java_Developer_Certificate.pdf"
                    title="IBM Java Developer — Professional Certificate"
                  />
                  <a className="btn btn-line" href={ibmVerifyHref} {...external}>Verify &#8599;</a>
                </div>
              </article>
              <article className="cred reveal">
                <p className="cred-when label">CV</p>
                <div className="cred-body">
                  <h3>Developer CV</h3>
                  <p>
                    Technical skills, selected projects, and training on one page. Open it and use
                    Print to save a PDF.
                  </p>
                </div>
                <div className="cred-actions">
                  <a className="btn btn-solid" href={cvHref} {...external}>Open CV &#8599;</a>
                </div>
              </article>
              <article className="cred reveal">
                <p className="cred-when label">Code</p>
                <div className="cred-body">
                  <h3>GitHub</h3>
                  <p>Public repositories and ongoing development work.</p>
                </div>
                <div className="cred-actions">
                  <a className="btn btn-line" href={contact.github} {...external}>Visit GitHub &#8599;</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="slab" id="contact">
          <div className="wrap">
            <div className="section-head">
              <p className="label">Contact</p>
              <h2 className="title title-xl">Let’s build something useful.</h2>
            </div>
            <div className="contact">
              <div className="contact-copy">
                <p>
                  Open to software development roles, remote or onsite, and to web projects you want
                  built.
                </p>
                <a className="contact-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
                <dl className="contact-rows">
                  <div>
                    <dt>Phone / WhatsApp</dt>
                    <dd><a href={contact.phoneHref}>{contact.phone}</a></dd>
                  </div>
                  <div><dt>Location</dt><dd>Lagos, Nigeria — open to remote</dd></div>
                  <div><dt>Local time</dt><dd><Clock /> WAT · GMT+1</dd></div>
                </dl>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot slab">
        <div className="wrap foot-inner">
          <span>© 2026 Favour Oluwapamilerin Akintade</span>
          <span className="foot-links">
            <a href={contact.linkedin} {...external}>LinkedIn</a>
            <a href={contact.github} {...external}>GitHub</a>
            <a href={contact.instagram} {...external}>Instagram</a>
            <a href={contact.x} {...external}>X</a>
          </span>
        </div>
      </footer>
    </>
  );
}
