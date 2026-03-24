function validateFields() {
    const emailValid = isEmailvalid();
    document.getElementById('login').disabled = !emailValid;

    const email = document.getElementById("email").value;
    if (!email) {
        document.getElementById('login').disabled = true;
    } else if (validateEmail(email)) {
        document.getElementById('login').disabled = false;
    } else {
        document.getElementById('login').disabled = true;
    }
    //verificar se o email nao é vazio e se o email é válido
    //se verdadeiro, entao habilitar o botao de recuperar senha
    //se falto, entao desabilitar o botao de recuperar senha
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isEmailvalid() {

    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function logar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    firebase.auth().signInWithEmailAndPassword(
        email, senha
    ).then(response => {
        window.location.href = "home.html";
    }).catch(error => {
        console.log('error', error)
    });


}

firebase.auth().onAuthStateChanged((aa) => {
    if(aa?.uid) {
        window.location.href = "home.html";
    }
})

