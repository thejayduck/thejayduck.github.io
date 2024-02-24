import styles from "../../styles/Home.module.scss";

import CardPanel from "../cardPanel";
import SkillBar from "../skillBar";
import Subtitle from "../subtitle";

export default function SkillsWrap() {
  return (
    <CardPanel title="Toolbox 🧰">
      <Subtitle text="Hobbies" icon="bx bx-hive" />
      <div className={`${styles.skills} grid`}>
        <SkillBar title="Programming" icon="bx bx-code-curly" />
        <SkillBar title="Drawing" icon="bx bxs-pencil" />
        <SkillBar title="Writing" icon="bx bxs-pen" />
        <SkillBar title="Cooking" icon="bx bxs-bowl-hot" />
      </div>

      <hr />

      <Subtitle text="Languages" icon="bx bx-code-alt" />
      <div className={`${styles.skills} grid`}>
        <SkillBar
          title="C#"
          icon="devicon-csharp-plain"
          href="https://www.w3schools.com/cs/index.php"
        />
        <SkillBar
          title="JavaScript"
          icon="devicon-javascript-plain"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        />
        <SkillBar
          title="TypeScript"
          icon="devicon-typescript-plain"
          href="https://www.typescriptlang.org/"
        />
        <SkillBar
          title="Rust"
          icon="devicon-rust-plain"
          href="https://www.rust-lang.org/"
        />
        <SkillBar
          title="HTML"
          icon="devicon-html5-plain"
          href="https://www.w3.org/html/"
        />
        <SkillBar
          title="CSS"
          icon="devicon-css3-plain"
          href="https://www.w3schools.com/css/"
        />
        <SkillBar
          title="SASS"
          icon="devicon-sass-plain"
          href="https://sass-lang.com/"
        />
        <SkillBar
          title="PHP"
          icon="devicon-php-plain"
          href="https://www.php.net/"
        />
        <SkillBar
          title="Node.js"
          icon="devicon-nodejs-plain"
          href="https://nodejs.org/en/"
        />
        <SkillBar
          title="Next.js"
          icon="devicon-nextjs-plain"
          href="https://nextjs.org/"
        />
        <SkillBar
          title="Bash"
          icon="devicon-bash-plain"
          href="https://www.gnu.org/software/bash/"
        />
      </div>

      <hr />

      <Subtitle text="Software" icon="bx bx-terminal" />
      <div className={`${styles.skills} grid`}>
        <SkillBar
          title="Visual Studio Code"
          icon="devicon-vscode-plain"
          href="https://code.visualstudio.com/"
        />
        <SkillBar
          title="Unity Engine"
          icon="devicon-unity-plain"
          href="https://unity.com/"
        />
        <SkillBar
          title="Godot Engine"
          icon="devicon-godot-plain"
          href="https://godotengine.org/"
        />
        <SkillBar
          title="Figma"
          icon="devicon-figma-plain"
          href="https://www.figma.com/"
        />
        <SkillBar
          title="Blender"
          icon="devicon-blender-original"
          href="https://www.blender.org/"
        />
        <SkillBar
          title="Premiere Pro"
          icon="devicon-premierepro-plain"
          href="https://www.adobe.com/products/premiere.html"
        />
        <SkillBar
          title="Linux (Arch Linux)"
          icon="devicon-archlinux-plain"
          href="https://archlinux.org/"
        />
        <SkillBar
          title="Infinite Painter"
          icon="bx bxs-palette"
          href="https://infinitestudio.art/"
        />
        <SkillBar
          title="Notion"
          icon="devicon-notion-plain"
          href="https://www.notion.so/"
        />
      </div>

      <hr />

      <Subtitle text="Databases" icon="bx bx-data" />
      <div className={`${styles.skills} grid`}>
        <SkillBar
          title="Postgresql"
          icon="devicon-postgresql-plain"
          href="https://www.postgresql.org/"
        />
        <SkillBar
          title="MongoDB"
          icon="devicon-mongodb-plain-wordmark"
          href="https://www.mongodb.com/"
        />
      </div>

      <hr />

      <Subtitle text="Others" icon="bx bx-box" />
      <div className={`${styles.skills} grid`}>
        <SkillBar
          title="Heroku"
          icon="devicon-heroku-original"
          href="https://heroku.com/"
        />
        <SkillBar
          title="Vercel"
          icon="devicon-vercel-original"
          href="https://vercel.com/"
        />
      </div>
    </CardPanel>
  );
}
