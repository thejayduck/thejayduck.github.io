import { getIcon } from "@/lib/helper";

export interface AnchorItemProps {
  level: number;
  id: string;
  content: string;
  children?: AnchorItemProps[];
}

export const TableOfContent = ({ anchors }: { anchors: AnchorItemProps[] }) => (
  <ul>
    {anchors.map((anchor) => (
      <li key={anchor.id}>
        <a
          style={{ paddingLeft: `${15 * anchor.level}px` }}
          href={`#user-content-${anchor.id}`}
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector(`#user-content-${anchor.id}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {anchor.level === 1 ? (
            <i className={`${getIcon("level1")} ri-xs`} />
          ) : anchor.level === 2 ? (
            <i className={`${getIcon("level2")} ri-xs`} />
          ) : (
            <i className={`${getIcon("level3")} ri-xs`} />
          )}
          {anchor.content}
        </a>
        {anchor.children && <TableOfContent anchors={anchor.children} />}
      </li>
    ))}
  </ul>
);
