// JG
jQuery.extend(jQuery.validator.messages, {
  required: "Harus diisi.",
  email: "Format email salah.",
	minlength: jQuery.validator.format("Minimum {0} karakter."),
  maxlength: jQuery.validator.format("Maksimum {0} karakter."),
  equalTo: "Kata sandi tidak cocok.",
  digits: "Semua harus digit.",
  number: "Semua harus angka.",
  date: "Penulisan tanggal salah.",
  qty: "Tidak boleh nol.",
	
  remote: "Veuillez remplir ce champ pour continuer.",
  url: "Veuillez entrer une URL valide.",
  dateISO: "Veuillez entrer une date valide (ISO).",
  creditcard: "Veuillez entrer un numéro de carte de crédit valide.",
  accept: "Veuillez entrer une valeur avec une extension valide.",

  rangelength: jQuery.validator.format("Veuillez entrer entre {0} et {1} caractères."),
  range: jQuery.validator.format("Veuillez entrer une valeur entre {0} et {1}."),
  max: jQuery.validator.format("Veuillez entrer une valeur inférieure ou égale à  {0}."),
  min: jQuery.validator.format("Veuillez entrer une valeur supérieure ou égale à  {0}.")
});