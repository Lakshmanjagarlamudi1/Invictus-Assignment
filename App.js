import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./styles.css";
export default function App() {
  const [value, setValue] = useState("");
  const [fetchedContent, setFetchedContent] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);

  const checkIsValid = (string) => {
    return !string.match(/[|\\/~^:,;?!&%$@*+ (){}.\n]/);
  };

  useEffect(() => {
    fetchContent();
  }, [fetchedContent]);

  const fetchContent = () => {
    fetch("https://raw.githubusercontent.com/invictustech/test/main/README.md")
      .then((response) => response.text())
      .then((result) => setFetchedContent(result));
  };

  const handlerSubmit = () => {
    if (fetchedContent) {
      const wordCounts = {};
      const words = fetchedContent.split(/\b/);
      for (let i = 0; i < words.length; i++)
        wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
      const x = Object.keys(wordCounts);
      const validString = x.filter((item) => {
        return checkIsValid(item);
      });
      const convertedObject = validString.map((value) => {
        return { word: value.replace("_", ""), count: wordCounts[value] };
      });
      const items = convertedObject.sort((a, b) => b.count - a.count);
      setFilteredWords(items.slice(0, value));
    } else {
      fetchContent();
    }
  };

  const columns = [
    {
      name: "Word",
      selector: "word",
      sortable: true
    },
    {
      name: "Count",
      selector: "count",
      sortable: true
    }
  ];
  return (
    <div className="invictus">
    <p className="Para">
        Invictus is the leading organization in the field of Safety and
        Compliance consulting. With several Fortune 500 organizations and Govt.
        agencies as its clientele, Invictus has touched over 20 million lives.
        Our clients include Microsoft, Adobe, Walmart, British Telecom, Canon,
        Pepsi, Sony, Maruti, TCS, Infosys, McKinsey and many more. Invictus is
        now making a leap in the field of smart technology solutions to enhance
        the overall safety quotient of individuals as well as organizations.
        With the safety and compliance industry in a hyper growth mode, we are
        aiming to become the number 1 safety and compliance tech brand in the
        next few years. We are in a rapid growth phase and are looking for
        individuals with drive and vision to associate with us to take us
        forward in our journey. What we promise to everyone at Invictus is a
        dynamic and intellectually stimulating environment with the flexibility
        to experiment. In addition to working on exciting tech, you would also
        have the satisfaction of creating a safer &amp; smarter society of
        tomorrow. Looking for talented engineers to - build Web and App projects
        using latest technologies - develop BACKEND services using technologies
        like nodejs, redis, mysql, memcached, mongodb, elastic search - develop
        FRONTEND in collaboration with UI/UX designer(s) using technologies like
        Reactjs, Nextjs, React Native - work on Data Analytics - work on Amazon
        AWS, Amazon EC2, Amazon Elasticache, Amazon ElasticSearch, Amazon Lambda
        and Serverless
      </p>
      <div className="content">
        <span className="text">Enter a number</span>
        <input
          className="entry"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="button" onClick={handlerSubmit}>
          Submit
        </button>
        <br />
      </div>
      <DataTable
        className="Answer"
        title="Word Count"
        columns={columns}
        data={filteredWords}
      />
    </div>
  );
}
