import useFetch from "../hooks/useFetch";
import "./CardSection.css";

const CardSection = ({
  title,
  path,
  type,
  style = "",
  hStyle = "",
  isSearchCard,
}) => {
  const { data, loading, error } = useFetch(path);

  return (
    <div
      className={`stream-w-full stream-max-w-screen-2xl stream-md-py-12 stream-py-10 stream-flex stream-flex-col ${style ? 'stream-dynamic-style' : ''}`}
    >
      {
        <h1
          className={`${
            hStyle ? hStyle : "stream-md-text-4xl"
          } stream-md-ml-6 stream-ml-2 stream-text-2xl stream-font-bold stream-mb-6 stream-text-f5eeff stream-opacity-90`}
        >
          {loading ? title : ""}
          {(data?.results?.length > 0 || data?.cast?.length > 0) && !loading
            ? title
            : ""}
        </h1>
      }
      {loading ? (
        <ContentWrapper
          Component={CardLoading}
          list={[1, 2, 3, 4, 5, 6, 7, 8]}
        />
      ) : (data?.results?.length > 0 || data?.cast?.length > 0) && !loading ? (
        <ContentWrapper
          list={data?.results || data?.cast}
          Component={Card}
          isSearchCard={isSearchCard}
          type={type}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CardSection;