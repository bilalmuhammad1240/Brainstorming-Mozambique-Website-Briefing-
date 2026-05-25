const $ = (id) =>
document.getElementById(id);

/* =========================
   TOGGLE
========================= */

function toggleSection(
  trigger,
  value,
  target
){

  if(!trigger) return;

  trigger.addEventListener(
    "change",
    () => {

      target.classList.toggle(
        "hidden",
        trigger.value !== value
      );

      updateProgress();

    }
  );

}

/* =========================
   TOGGLES
========================= */

toggleSection(
  $("identidadeVisual"),
  "sim",
  $("identidadeBox")
);

toggleSection(
  $("objetivoSite"),
  "membros",
  $("captacaoBox")
);

toggleSection(
  $("hierarquia"),
  "sim",
  $("estruturaBox")
);

toggleSection(
  $("acessoRestrito"),
  "restrito",
  $("privadaBox")
);

/* =========================
   PROJECTOS
========================= */

$("projetosCheck")
?.addEventListener(
  "change",
  () => {

    $("projetosBox")
    .classList.toggle(
      "hidden",
      !$("projetosCheck").checked
    );

    updateProgress();

  }
);

/* =========================
   PROGRESS
========================= */

const form =
$("briefingForm");

const fields =
form.querySelectorAll(
  "input, select, textarea"
);

function updateProgress(){

  let filled = 0;

  fields.forEach(field => {

    if(
      field.type === "checkbox"
    ){

      if(field.checked){
        filled++;
      }

    }

    else if(
      field.value.trim() !== ""
    ){

      filled++;

    }

  });

  const percent =
  Math.round(
    (filled / fields.length) * 100
  );

  $("progressFill").style.width =
  percent + "%";

  $("progressPercent").innerHTML =
  percent + "%";

}

fields.forEach(field => {

  field.addEventListener(
    "input",
    updateProgress
  );

});

/* =========================
   TOAST
========================= */

function showToast(message){

  const toast = $("toast");

  toast.innerHTML = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}

/* =========================
   SUBMIT
========================= */

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const submitBtn =
    $("submitBtn");

    const btnText =
    document.querySelector(
      ".btn-text"
    );

    const loader =
    document.querySelector(
      ".loader"
    );

    submitBtn.disabled = true;

    btnText.innerHTML =
    "A enviar...";

    loader.classList.remove(
      "hidden"
    );

    try{

      const response =
      await fetch(
        form.action,
        {
          method:"POST",
          body:new FormData(form),
          headers:{
            Accept:
            "application/json"
          }
        }
      );

      if(response.ok){

        showToast(
          "Briefing enviado com sucesso ✅"
        );

        form.reset();

        localStorage.clear();

        updateProgress();

      }

      else{

        showToast(
          "Erro ao enviar"
        );

      }

    }

    catch(error){

      showToast(
        "Falha de conexão"
      );

    }

    finally{

      submitBtn.disabled = false;

      btnText.innerHTML =
      "Enviar Briefing →";

      loader.classList.add(
        "hidden"
      );

    }

  }
);

/* =========================
   INIT
========================= */

updateProgress();


/* =========================
   AUTO SAVE
========================= */

/*fields.forEach(field => {

  const key =
  field.name || field.id;

  if(!key) return;

  const saved =
  localStorage.getItem(key);

  if(saved){

    if(
      field.type === "checkbox"
    ){

      field.checked =
      saved === "true";

    }

    else{

      field.value = saved;

    }

  }

  field.addEventListener(
    "input",
    () => {

      if(
        field.type === "checkbox"
      ){

        localStorage.setItem(
          key,
          field.checked
        );

      }

      else{

        localStorage.setItem(
          key,
          field.value
        );

      }

    }
  );

});*/

/* =========================
   FILE VALIDATION
========================= */

const fileInput =
document.querySelector(
  'input[type="file"]'
);

if(fileInput){

  fileInput.addEventListener(
    "change",
    () => {

      const file =
      fileInput.files[0];

      if(!file) return;

      const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml"

      ];

      if(
        !allowedTypes.includes(
          file.type
        )
      ){

        showToast(
          "Formato inválido"
        );

        fileInput.value = "";

        return;

      }

      const maxSize =
      5 * 1024 * 1024;

      if(file.size > maxSize){

        showToast(
          "Imagem muito grande (máx 5MB)"
        );

        fileInput.value = "";

      }

    }
  );

}

/* =========================
   FILE NAME
========================= */

const logoUpload =
$("logoUpload");

if(logoUpload){

  logoUpload.addEventListener(
    "change",
    () => {

      const file =
      logoUpload.files[0];

      if(!file) return;

      const uploadLabel =
      document.querySelector(
        ".upload-label span:nth-child(2)"
      );

      uploadLabel.innerHTML =
      file.name;

    }
  );

}

/* =========================
   WHATSAPP FORMAT
========================= */

const whatsapp =
$("whatsapp");

if(whatsapp){

  whatsapp.addEventListener(
    "input",
    (e) => {

      let value =
      e.target.value
      .replace(/\D/g,"");

      if(value.length > 9){

        value =
        value.slice(0,9);

      }

      if(value.length > 2){

        value =
        value.replace(
          /(\d{2})(\d+)/,
          "$1 $2"
        );

      }

      if(value.length > 6){

        value =
        value.replace(
          /(\d{2}) (\d{3})(\d+)/,
          "$1 $2 $3"
        );

      }

      e.target.value = value;

    }
  );

}