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

    // 🔥 MAIN FIX — yahi game changer hai
    const finalData = {
      attempt: data.result.attempt,
      result: data.result.result, // nested se actual data nikala
      success: data.result.success,

      buy_api: "@mynk_mynk_mynk",
      support: "@mynk_mynk_mynk",
      _powered_by: "mynk"
    };

    return res.status(200).json(finalData);

  } catch (e) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
