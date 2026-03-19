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

    const url = `https://telegram-to-num-uu9k.vercel.app/sms?key=Mynk&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    // ✅ agar error aya to hide karo
    const text = JSON.stringify(data).toLowerCase();

    if (
      text.includes("limit") ||
      text.includes("admin") ||
      text.includes("backend") ||
      text.includes("error") ||
      text.includes("contact") ||
      text.includes("failed")
    ) {
      return res.status(200).json({
        status: false,
        message: "api down"
      });
    }

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

    // ✅ agar server error ho
    res.status(200).json({
      status: false,
      message: "api down"
    });

  }
}
