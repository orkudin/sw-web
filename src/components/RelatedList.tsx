// components/RelatedList.tsx
import RelatedEntity from "./RelatedEntity";

interface RelatedListProps {
  title: string;
  urls: string[];
}

const RelatedList = ({ title, urls }: RelatedListProps) => {
  return (
    <div>
      <h4>{title.toUpperCase()}</h4>
      <ul>
        {urls.map((url) => (
          <li key={url}>
            <RelatedEntity url={url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedList;
