import React, { useEffect, useState } from "react";
import Parse from "parse";
import FlexColumn from "@components/common/FlexColumn";
import SearchResult from "./SearchResult";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import { useRouter } from "next/router";
import { SEARCH_PATH } from "src/paths";

function PreviewSearch({
  queryString,
  collectionName,
  fieldToSearch,
  title,
  singleResultTitle,
}) {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const { query } = useRouter();

  const resultsLimitAmount = 3;

  useEffect(() => {
    const getData = async () => {
      const obj = Parse.Object.extend(collectionName);
      const query = new Parse.Query(obj);

      if (collectionName === "User") {
        query.startsWith(fieldToSearch, String(queryString));
      } else {
        query.fullText(fieldToSearch, String(queryString));
      }

      query.skip(0);
      query.limit(resultsLimitAmount);
      query.includeAll();
      query.withCount();
      query.find();

      const result = await query.find();

      setResults(result.results);
      setCount(result.count);
    };

    getData();
  }, [queryString, collectionName, fieldToSearch]);

  return (
    <>
      {count > 0 && (
        <FlexColumn>
          <Title
            text={
              count === 1 ? singleResultTitle : title.replace(":number", count)
            }
            margin="0px 0px 10px 0px"
          />

          {results.map((result, index) => (
            <FlexColumn key={index} margin={"0px 0px 15px 0px"}>
              <SearchResult data={result} type={collectionName} />
            </FlexColumn>
          ))}

          {count > resultsLimitAmount && (
            <Button
              as={"a"}
              typeStyle={"tertiary"}
              href={SEARCH_PATH.concat(`?s=${query.s}&c=${collectionName}`)}
            >
              Ver todos los resultados
            </Button>
          )}
        </FlexColumn>
      )}
    </>
  );
}

export default PreviewSearch;
