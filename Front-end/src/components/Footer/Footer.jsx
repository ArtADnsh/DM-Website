import { courseLinks } from '../../data/courseLinks';
import styles from './Footer.module.css';

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 256 256" stroke="none" aria-hidden="true">
      <path
        fill="#5846bd"
        fillRule="evenodd"
        d="
          M128 0
          a128 128 0 1 1 0 256
          a128 128 0 1 1 0-256 Z

          M57.94 126.648
          c37.32-16.256 62.2-26.974 74.64-32.152
          35.56-14.786 42.94-17.354 47.76-17.441
          1.06-.017 3.42.245 4.96 1.49
          1.28 1.05 1.64 2.47 1.82 3.467
          .16.996.38 3.266.2 5.038
          -1.92 20.24-10.26 69.356-14.5 92.026
          -1.78 9.592-5.32 12.808-8.74 13.122
          -7.44.684-13.08-4.912-20.28-9.63
          -11.26-7.386-17.62-11.982-28.56-19.188
          -12.64-8.328-4.44-12.906 2.76-20.386
          1.88-1.958 34.64-31.748 35.26-34.45
          .08-.338.16-1.598-.6-2.262
          -.74-.666-1.84-.438-2.64-.258
          -1.14.256-19.12 12.152-54 35.686
          -5.1 3.508-9.72 5.218-13.88 5.128
          -4.56-.098-13.36-2.584-19.9-4.708
          -6.54-2.124-11.74-3.248-11.28-6.856
          .24-1.88 2.84-3.804 7.78-5.776
          Z
        "
      />
    </svg>
  );
}


function QueraIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <path
        fill="#5846bd"
        fillRule="evenodd"
        d="
          M256 0
          a256 256 0 1 1 0 512
          a256 256 0 1 1 0-512 Z

          M180 106
          H332
          Q406 106 406 180
          V332
          Q406 350 398 364
          L273 239
          L239 273
          L393 427
          L377 443
          L350 422
          Q326 406 300 406
          H180
          Q106 406 106 332
          V180
          Q106 106 180 106 Z
        "
      />
    </svg>
  );
}

function BaleIcon() {
  return (
    <svg
      viewBox="0 0 601 601"
      fill="#5846bd"
      stroke="none"
      aria-hidden="true"
    >
      <path
        transform="translate(59.0625,9.375)"
        d="
          M0 0
          C10.2 6.6 20.1 13.6 29.9 20.6
          C30.7 21.2 31.5 21.7 32.3 22.3
          C34.6 23.9 36.9 25.6 39.1 27.2
          C39.9 27.7 40.6 28.2 41.3 28.8
          C45.2 31.6 49 34.4 52.7 37.4
          C53.4 38 54.2 38.6 55 39.3
          C56.5 40.4 57.9 41.6 59.4 42.8
          C60 43.4 60.7 43.9 61.4 44.4
          C61.9 44.9 62.5 45.4 63.1 45.9
          C65 46.9 65 46.9 67.3 46
          C70.1 44.5 72.5 42.9 75 40.9
          C80.7 36.7 86.6 33.2 92.8 29.8
          C94.4 28.8 94.4 28.8 96 27.9
          C167.6 -11.2 250.8 -19.1 328.9 3.5
          C382.1 19.3 434.8 52 469.7 95.8
          C472 98.7 474.4 101.5 476.8 104.2
          C487.7 117.4 496.7 131.7 504.9 146.6
          C505.4 147.4 505.8 148.1 506.2 148.9
          C544.2 216.5 551.2 299.1 530.8 373.3
          C515.1 428.2 482.9 480.6 438.9 517.6
          C438.4 518.1 437.9 518.5 437.3 519
          C391.4 557.4 335.7 582.9 275.9 589.6
          C274.7 589.8 274.7 589.8 273.5 589.9
          C263.1 590.9 252.7 590.9 242.2 590.9
          C240.7 590.9 240.7 590.9 239.2 590.9
          C223.9 590.9 209 590.3 193.9 587.6
          C192.9 587.5 191.9 587.3 190.9 587.1
          C133.2 577.1 81.1 551 37.9 511.6
          C37 510.8 36 509.9 35 509
          C8.2 485 -13.8 454.3 -29.1 421.7
          C-29.8 420.3 -30.4 418.8 -31.1 417.4
          C-44.2 390.5 -52 361.8 -56.4 332.2
          C-56.5 331.2 -56.7 330.1 -56.9 329
          C-59.5 309.8 -59.2 290.4 -59.2 271.1
          C-59.2 268.4 -59.2 265.7 -59.2 263
          C-59.3 255.7 -59.3 248.4 -59.3 241.1
          C-59.3 236.5 -59.3 231.9 -59.3 227.3
          C-59.3 214.6 -59.3 202 -59.3 189.3
          C-59.3 188.4 -59.3 187.6 -59.3 186.8
          C-59.3 186 -59.3 185.2 -59.3 184.4
          C-59.3 182.7 -59.3 181.1 -59.3 179.4
          C-59.3 178.6 -59.3 177.8 -59.3 177
          C-59.3 163.7 -59.3 150.5 -59.3 137.3
          C-59.4 123.7 -59.4 110.1 -59.4 96.5
          C-59.4 88.8 -59.4 81.2 -59.4 73.6
          C-59.4 67.1 -59.4 60.6 -59.4 54.1
          C-59.4 50.8 -59.4 47.5 -59.4 44.2
          C-59.4 40.6 -59.4 37 -59.4 33.4
          C-59.4 32.4 -59.4 31.4 -59.5 30.3
          C-59.4 19.5 -57.7 9.7 -50.1 1.6
          C-49.5 1 -48.9 0.4 -48.4 -0.3
          C-34 -14.6 -15.2 -9.6 0 0 Z

          M322.4 180.8
          C321.1 182.2 319.7 183.5 318.4 184.8
          C314.9 188.4 311.3 191.9 307.8 195.5
          C304 199.2 300.3 203 296.6 206.7
          C289.5 213.8 282.5 220.8 275.5 227.9
          C267.4 235.9 259.4 244 251.4 252
          C234.9 268.5 218.4 285.1 201.9 301.6
          C198.1 299.8 195.7 297.6 192.7 294.6
          C192.2 294 191.7 293.5 191.2 293
          C190.1 291.9 189 290.7 187.9 289.6
          C186.1 287.8 184.4 286.1 182.6 284.3
          C177.6 279.2 172.7 274.2 167.7 269.1
          C164.7 266 161.6 262.9 158.5 259.8
          C157.4 258.7 156.2 257.5 155.1 256.3
          C141.8 242.6 127.4 234.1 107.8 233.6
          C94 233.7 82 238.3 70.9 246.6
          C69.7 247.5 69.7 247.5 68.5 248.5
          C58.1 257.3 51 271.3 49.7 284.9
          C49.6 287.2 49.6 289.6 49.6 291.9
          C49.6 292.8 49.6 293.6 49.6 294.5
          C49.8 300.9 50.5 306.6 52.9 312.6
          C53.3 313.6 53.7 314.5 54.1 315.5
          C59.6 327.8 69.2 337 78.5 346.4
          C79.6 347.5 79.6 347.5 80.6 348.6
          C81.3 349.3 81.9 349.9 82.6 350.6
          C83.2 351.2 83.8 351.8 84.4 352.4
          C85.9 353.8 85.9 353.8 87.9 353.6
          C88.3 354.6 88.6 355.6 88.9 356.6
          C90.6 358.3 90.6 358.3 92.6 359.9
          C96.6 363.3 100.3 366.8 103.9 370.6
          C104.9 371.5 104.9 371.5 105.9 372.6
          C107.3 374 108.7 375.4 110.1 376.8
          C112.3 379 114.5 381.2 116.7 383.5
          C123 389.8 129.3 396.1 135.6 402.5
          C139.4 406.4 143.3 410.3 147.2 414.2
          C148.6 415.7 150.1 417.1 151.5 418.6
          C165.6 432.9 179.8 443.2 200.6 444
          C227.2 443.5 243.6 426.3 261.2 408.6
          C263 406.9 264.7 405.2 266.4 403.5
          C270.6 399.3 274.7 395.1 278.9 391
          C282.3 387.6 285.7 384.2 289.1 380.8
          C298.7 371.2 308.4 361.6 318 351.9
          C318.5 351.4 319 350.9 319.6 350.4
          C320.1 349.8 320.6 349.3 321.1 348.8
          C329.6 340.4 338 332 346.4 323.6
          C355.1 314.9 363.7 306.3 372.4 297.6
          C377.2 292.8 382.1 287.9 386.9 283.1
          C391.5 278.6 396.1 274 400.6 269.4
          C402.3 267.8 404 266.1 405.6 264.4
          C415.5 254.6 424.6 245.5 429.8 232.2
          C430.4 230.8 430.4 230.8 431 229.4
          C435.9 215.1 433.7 198.2 427.6 184.7
          C420.5 170.6 408.8 160.8 393.9 155.6
          C363.6 147.8 343.1 159.9 322.4 180.8 Z
        "
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#5846bd"
      stroke="none"
      aria-hidden="true"
    >
      <path d="
        M12 2
        C6.48 2 2 6.03 2 11
        C2 13.12 2.82 15.07 4.19 16.61
        L2.5 22
        L8.2 19.33
        C9.37 19.77 10.65 20 12 20
        C17.52 20 22 15.97 22 11
        C22 6.03 17.52 2 12 2
        Z
      " />
    </svg>
  );
}

function PlatformIcon({ type }) {
  if (type === 'telegram')
    return <TelegramIcon />;

  else if (type === 'quera')
    return <QueraIcon />;

  else if (type === 'bale')
    return <BaleIcon />;

  return <ChatIcon />;
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* TOP MULTI-COLUMN GRID */}
        <div className={styles.grid}>
          {/* COLUMN 1: BRAND & COURSE INFO */}
          <div className={styles.brandCol}>
            <div className={styles.logoBadge}>
              <span className={styles.badgeDot} />
              Discrete Mathematics
            </div>
            <h3 className={styles.courseTitle}>Fall 2026 · Semester 4051</h3>
            <p className={styles.courseDesc}>
              Official course portal for Discrete Mathematics, Department of Computer Engineering at Iran University of Science and Technology.
            </p>
            <div className={styles.profTag}>
              Instructor: <strong>Dr. Tahaei</strong>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="/" data-internal-link>Home Page</a>
              </li>
              <li>
                <a href="/materials" data-internal-link>Course Materials</a>
              </li>
              <li>
                <a href="/tutorials" data-internal-link>Tutorial Recordings</a>
              </li>
              <li>
                <a href="/tas" data-internal-link>Meet the Teaching Team</a>
              </li>
              <li>
                <a href="/contact" data-internal-link>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: USEFUL LINKS & PORTALS */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Useful Links</h4>
            <ul className={styles.portalList}>
              {courseLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.portalLink}
                  >
                    <span className={styles.portalIcon}>
                      <PlatformIcon type={link.type} />
                    </span>
                    <span className={styles.portalCopy}>
                      <strong>{link.title}</strong>
                      <small>{link.subtitle}</small>
                    </span>
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: HEAD TAs & WEBSITE CREATORS */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Head TAs</h4>
            <ul className={styles.contactList}>
              <li>
                <span>Amir Jebbeli</span>
                <a href="https://t.me/Amir_Jebbeli" target="_blank" rel="noreferrer">@Amir_Jebbeli</a>
              </li>
              <li>
                <span>Kasra Nouri</span>
                <a href="https://t.me/UnicornKN" target="_blank" rel="noreferrer">@UnicornKN</a>
              </li>
            </ul>

            <h4 className={`${styles.colTitle} ${styles.subTitle}`}>Website Creators</h4>
            <ul className={styles.contactList}>
              <li>
                <span>Arta Danesh</span>
                <a href="https://t.me/ArtA_Dnsh" target="_blank" rel="noreferrer">@ArtA_Dnsh</a>
              </li>
              <li>
                <span>Koosha Majlesi</span>
                <a href="https://t.me/kmajl84" target="_blank" rel="noreferrer">@kmajl84</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & CREDITS */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 Discrete Mathematics. All rights reserved.
          </p>

          <p className={styles.credits}>
            Designed &amp; Developed by <strong>Arta Danesh</strong> &amp; <strong>Koosha Majlesi</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
