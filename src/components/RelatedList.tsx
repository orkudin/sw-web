import RelatedEntity from "./RelatedEntity";
import "../styles/RelatedList.css";

interface RelatedListProps {
  title: string;
  urls: string[];
}

const RelatedList = ({ title, urls }: RelatedListProps) => {
  return (
    <div className="related-list">
      <h4 className="related-list-title">{title.toUpperCase()}</h4>
      <ul className="related-list-items">
        {urls.map((url) => (
          <li key={url} className="related-list-item">
            <RelatedEntity url={url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedList;
