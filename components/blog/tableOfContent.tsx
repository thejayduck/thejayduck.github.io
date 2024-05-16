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
        >
          {anchor.level > 1 ? "- " : "◯ "}
          {anchor.content}
        </a>
        {anchor.children && <TableOfContent anchors={anchor.children} />}
      </li>
    ))}
  </ul>
);
