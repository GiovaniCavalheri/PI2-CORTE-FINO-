class HomeController {
  indexView(req, res) {
    res.render("index");
  }

  aboutView(req, res) {
    res.render("about");
  }

  servicesView(req, res) {
    res.render("services");
  }

  contactView(req, res) {
    res.render("contact");
  }

  offersView(req, res) {
    res.render("offers");
  }

  signaturesView(req, res) {
    res.render("signatures");
  }

  joinView(req, res) {
    res.render("join");
  }

  cartView(req, res) {
    res.render("cart");
  }

  cadastroView(req, res) {
    res.render("cadastro");
  }

  admView(req, res) {
    res.render("adm");
  }
}

module.exports = HomeController;
