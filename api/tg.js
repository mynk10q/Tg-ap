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

    const url = `https://tg-num-two.vercel.app/sms?key=sellapi&userid=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.result) {
      return res.status(200).json({
        status: false,
        message: "api down"
      });
    }

    // ✅ extract like python style
    const r = data.result;

    const formatted = {
      status: true,
      country: r.country || "N/A",
      country_code: r.country_code || "N/A",
      number: r.number || "N/A",
      tg_id: r.tg_id || "N/A",
      message: r.msg || "",

      // ✅ keep your tags (as you said)
      buy_api: "@mynk_mynk_mynk",
      support: "@mynk_mynk_mynk",
      _powered_by: "mynk"
    };

    return res.status(200).json(formatted);

  } catch (error) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
