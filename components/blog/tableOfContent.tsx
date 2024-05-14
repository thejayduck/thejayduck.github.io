export interface AnchorItemProps {
  level: number;
  id: string;
  content: string;
  children?: AnchorItemProps[];
}

export const TableOfContent = ({ anchors }: { anchors: AnchorItemProps[] }) => (
  <ul>
    {anchors.map((anchor, idx) => (
      <li key={anchor.id}>
        <a
          style={{ paddingLeft: `${20 * anchor.level}px` }}
          href={`#user-content-${anchor.id}`}
        >
          {anchor.content}
        </a>
        {anchor.children && <TableOfContent anchors={anchor.children} />}
      </li>
    ))}
  </ul>
);
