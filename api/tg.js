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

    // ✅ Only backup API
    const url = `https://telegram-to-num-uu9k.vercel.app/sms?key=Mynk&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    // remove old fields
    delete data.BUY_API;
    delete data.SUPPORT;
    delete data.buy_api;
    delete data.support;
    delete data._powered_by;

    // add your name
    data.buy_api = "@mynk_mynk_mynk";
    data.support = "@mynk_mynk_mynk";
    data._powered_by = "mynk";

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
}
