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

    const url = `https://tg-num-two.vercel.app/api/userid=${term}?key=sellapi`;

    const response = await fetch(url);
    const data = await response.json();

    // ✅ safe check
    if (!data) {
      return res.status(200).json({
        status: false,
        message: "api down"
      });
    }

    // branding
    data.buy_api = "@mynk_mynk_mynk";
    data.support = "@mynk_mynk_mynk";
    data._powered_by = "mynk";

    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
