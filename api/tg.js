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

    let data;

    // ✅ First API
    try {

      const url1 = `https://www.zephrexdigital.site/api?key=ZEPH-OX98&type=TG_NUM&term=${term}`;

      const r1 = await fetch(url1);
      data = await r1.json();

    } catch (e) {

      // ✅ Backup API (agar pehli fail ho)
      const url2 = `https://telegram-to-num-uu9k.vercel.app/sms?key=Mynk&term=${term}`;

      const r2 = await fetch(url2);
      data = await r2.json();

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
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
}
