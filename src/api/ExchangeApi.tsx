import axios from "axios";

const getExchanges = async (link: string, limit: string) => {
  const api_key = import.meta.env.VITE_SIMPLISWAP_API_KEY;
  
  ("https://api.simpleswap.io/get_exchanges?api_key=f1111d26-33eb-4314-8374-a40e9d2887ee&limit=50&offset=0");
  const responds = await axios.get(
    `${link}?api_key=${api_key}&limit=${limit}&offset=0`
  );
  return responds;
};

export { getExchanges };
