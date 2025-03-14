import styles from "../../styles/Home.module.scss";

import toolbox from "../../docs/json/toolbox.json";
import CardPanel from "../cardPanel";
import SkillBar from "../skillBar";
import Subtitle from "../subtitle";

export default function SkillsWrap() {
  return (
    <CardPanel title="Toolbox 🧰">
      <Subtitle text="Hobbies" icon="ri-archive-stack-fill" />
      <div className={`${styles.skills} grid`}>
        <SkillBar title="Programming" icon="ri-braces-fill" />
        <SkillBar title="Drawing" icon="ri-pen-nib-fill" />
        <SkillBar title="Writing" icon="ri-quill-pen-fill" />
        <SkillBar title="Cooking" icon="ri-bowl-fill" />
        <SkillBar title="Reading" icon="ri-book-fill" />
      </div>

      <hr />

      <Subtitle text="Languages" icon="ri-code-s-slash-fill" />
      <div className={`${styles.skills} grid`}>
        {toolbox.languages.map((language) => (
          <SkillBar
            key={language.title}
            title={language.title}
            icon={language.icon}
            href={language.href}
          />
        ))}
      </div>

      <hr />

      <Subtitle text="Software" icon="ri-terminal-box-fill" />
      <div className={`${styles.skills} grid`}>
        {toolbox.software.map((software) => (
          <SkillBar
            key={software.title}
            title={software.title}
            icon={software.icon}
            href={software.href}
          />
        ))}
      </div>

      <hr />

      <Subtitle text="Others" icon="ri-archive-fill" />
      <div className={`${styles.skills} grid`}>
        {toolbox.others.map((other) => (
          <SkillBar
            key={other.title}
            title={other.title}
            icon={other.icon}
            href={other.href}
          />
        ))}
      </div>
    </CardPanel>
  );
}
