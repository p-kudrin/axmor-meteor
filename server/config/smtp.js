var smtp = {
	username: "kupas@ngs.ru",
  	password: "c4intsc()",
  	server:   "smtp.ngs.ru",
  	port:     "25"
};  

_(smtp).each(function(value, key) {
	smtp[key] = encodeURIComponent(value);
});

var url = "smtp://#{smtp.username}:#{smtp.password}@#{smtp.server}:#{smtp.port}";

process.env.MAIL_URL = url;