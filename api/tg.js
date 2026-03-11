export default async function handler(req, res) {
  try {

    const { key, term } = req.query;

    if (key !== "mynkx") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Enter number"
      });
    }

    const url = `https://www.zephrexdigital.site/api?key=ZEPH-OX98&type=TG_NUM&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    data.BUY_API = "@mynk_mynk_mynk";
    data.SUPPORT = "@mynk_mynk_mynk";

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
}
