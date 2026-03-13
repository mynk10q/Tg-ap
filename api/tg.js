export default async function handler(req, res) {
  try {

    const { key, term } = req.query;

    // API key check
    if (key !== "mynkx") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    // term check
    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Enter number"
      });
    }

    // ✅ NEW API HERE
    const url = `https://www.zephrexdigital.site/api?key=ZEPH-OX98&type=TG_NUM&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    // custom add
    data.buy_api = "@mynk_mynk_mynk";
    data.support = "@mynk_mynk_mynk";

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
}
