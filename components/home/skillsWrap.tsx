import styles from "../../styles/Home.module.scss";

import toolbox from "../../docs/json/toolbox.json";
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
        <SkillBar title="Reading" icon="bx bxs-book" />
      </div>

      <hr />

      <Subtitle text="Languages" icon="bx bx-code-alt" />
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

      <Subtitle text="Software" icon="bx bx-terminal" />
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

      <Subtitle text="Others" icon="bx bx-box" />
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
