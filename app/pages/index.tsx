import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

interface State {
  num: number[];
}

const initialState: State = {
  num: [],
};

const Home: NextPage = () => {
  const [num, setNum] = useState(initialState.num);

  const handleClick = async () => {
    try {
      const res = await axios.get("http://localhost:3000/example").then(function (res) {
        console.log(res.data);
        setNum(res.data.num);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      <p>{num}</p>
      <button onClick={handleClick}>取得</button>
      <p>test</p>
      <p>test2</p>
      <p>test3</p>
    </div>
  );
};

export default Home;
