import styles from "../../styles/Home.module.scss";

import toolbox from "../../docs/json/toolbox.json";
import { getIcon } from "../../lib/helper";
import CardPanel from "../cardPanel";
import SkillBar from "../skillBar";
import Subtitle from "../subtitle";

export default function SkillsWrap() {
  return (
    <CardPanel title="Toolbox 🧰">
      <Subtitle text="Hobbies" icon={getIcon("hobbies")} />
      <div className={`${styles.skills} grid`}>
        <SkillBar title="Programming" icon={getIcon("programming")} />
        <SkillBar title="Drawing" icon={getIcon("drawing")} />
        <SkillBar title="Writing" icon={getIcon("writing")} />
        <SkillBar title="Cooking" icon={getIcon("cooking")} />
        <SkillBar title="Reading" icon={getIcon("reading")} />
      </div>

      <hr />

      <Subtitle text="Languages" icon={getIcon("languages")} />
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

      <Subtitle text="Software" icon={getIcon("software")} />
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

      <Subtitle text="Others" icon={getIcon("others")} />
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
