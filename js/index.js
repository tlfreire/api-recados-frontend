window.addEventListener('load', () => {
  axios.get('https://thiago-recados-b.herokuapp.com/users')
      .then(resposta => {
          localStorage.setItem("ListaDeUsuarios", JSON.stringify(resposta.data.users));
      });
  });


function acesso() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let logado = false;

  const usuariosLS = localStorage.getItem("ListaDeUsuarios");
  const usuariosFormatados = JSON.parse(usuariosLS);
  let usuarioLogado = "";

  for (const usuario of usuariosFormatados) {
    
    if (usuario.email === email && usuario.senha == password) {
      logado = true;
      usuarioLogado = usuario;
      window.location.href = "./paginaDeRecados.html";
    }
    localStorage.setItem("UsuarioLogado", JSON.stringify(usuarioLogado.userId));
  }
  if (logado === false) {
    alert("Dados inválidos. Digite novamente ou crie sua conta.");
  }
}
 function botaoCriarConta() {
   document.getElementById("entrar").innerHTML = "CRIAR CONTA";
   document.getElementById("repeat-password").style.display = "inline";
   document.getElementById("botao-criar-conta-agora").style.display = "inline";
   document.getElementById("botao-entrar").style.display = "none";
   document.getElementById("botao-criar-conta").style.display = "none";
   document.getElementById("email").style.width = "330px";
   document.getElementById("password").style.width = "330px";
   document.getElementById("password").style.marginTop = "3px";
   document.getElementById("password").style.marginBottom = "3px";
 }

 function criarConta() {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const repeatPassword = document.getElementById("repeat-password").value;
   
   if (password != repeatPassword) {
     return alert("Senhas devem ser idênticas");
   }
   
   axios.post(`https://thiago-recados-b.herokuapp.com/users`, {
        email: email,
        senha: password
    }).then(retorno => {
      localStorage.setItem("ListaDeUsuarios", JSON.stringify(listaDeUsuarios));
        
      })
   location.reload();
 }