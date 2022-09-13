const { response } = require("express");
const NewsAPI = require("newsapi");
const catchAsyncError = require("../utils/catchAsyncError");
console.log("API KEY", process.env.API_KEY);
const newsapi = new NewsAPI("`${process.env.API_KEY}`");

exports.checkBody = (req, res, next) => {
  if (!req.body.topic || !req.body.from || !req.body.to) {
    return res.status(400).json({
      status: "fail",
      message: "Topic or start-date or end-date missing",
    });
  }
  next();
};

exports.getTopHeadlines = async (req, res, next) => {
  const { q: topic, sources, from, to } = req.body;

  await newsapi.v2
    .topHeadlines({
      q,
      language: "en",
      country: "us",
    })
    .then((response) => {
      console.log(response);
    });
};

exports.getEverything = catchAsyncError(async (req, res, next) => {
  const { topic, sources, from, to } = req.body;
  // To query /v2/everything
  // You must include at least one q, source, or domain
  await newsapi.v2
    .everything({
      q: topic,
      sources: "bbc-news,the-verge",
      domains: "bbc.co.uk, techcrunch.com",
      from,
      to,
      language: "en",
      sortBy: "relevancy",
    })
    .then((response) => {
      res.status(200).json(response);
      console.log(response);
    });
});
