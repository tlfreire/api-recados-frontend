
let usuariosLS = localStorage.getItem("ListaDeUsuarios");
let usuariosFormatados = JSON.parse(usuariosLS);

let usuarioLogadoLS = localStorage.getItem("UsuarioLogado");
let usuarioLogadoFormatados = JSON.parse(usuarioLogadoLS);

    function ImprimirDados() {
        const dados = document.getElementById("corpo");
        let novoConteudo = "";
     
        for (let usuarioX=0; usuarioX < usuariosFormatados.length; usuarioX++) {
          for(let recadoY=0; recadoY < usuariosFormatados[usuarioX].recados.length; recadoY++)
          novoConteudo += `
              <tr>
                 <td></td>
                 <td>${usuariosFormatados[usuarioX].recados[recadoY].descricao}</td>
                 <td>${usuariosFormatados[usuarioX].recados[recadoY].detalhe}</td>
                 <td><button type="button" onclick='modalAtualizarRecado("${usuariosFormatados[usuarioX].recados[recadoY].recadoId}")' class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Editar</button>
                 <button type="button" onclick='apagarRecado("${usuariosFormatados[usuarioX].recados[recadoY].recadoId}")' class="btn btn-primary">Apagar</button></td>
             </tr>
              `;
         }
         novoConteudo += "</tbody> </table>";
         dados.innerHTML = novoConteudo;
         console.log(usuariosFormatados[usuarioX].recados[recadoY].descricao)
      }

    ImprimirDados()

    function salvarDetalhe() {
   
      let inputDescricao = document.getElementById("inputDescricao").value;
      let inputDetalhamento = document.getElementById("inputDetalhamento").value;

      axios.post(`https://thiago-recados-b.herokuapp.com/users/${usuarioLogadoFormatados}/recados`, {
      descricao: inputDescricao,
      detalhe: inputDetalhamento
      }).then(retorno => {
        axios.get('https://thiago-recados-b.herokuapp.com/users')
      .then(resposta => {
          localStorage.setItem("ListaDeUsuarios", JSON.stringify(resposta.data.users));
          location.reload();
          ImprimirDados()
          
      });
        });
   }

   
   
   function apagarRecado(idRecado) {

       let idUsuario = "";
       for (let usuarioX=0; usuarioX < usuariosFormatados.length; usuarioX++) {
         for(let recadoY=0; recadoY < usuariosFormatados[usuarioX].recados.length; recadoY++) {
           if(idRecado === usuariosFormatados[usuarioX].recados[recadoY].recadoId) {
             idUsuario = usuariosFormatados[usuarioX].userId;
           }
         }
       }

      axios.delete(`https://thiago-recados-b.herokuapp.com/users/${idUsuario}/recados/${idRecado}`)
      .then(retorno => {
        axios.get('https://thiago-recados-b.herokuapp.com/users')
      .then(resposta => {
        
          localStorage.setItem("ListaDeUsuarios", JSON.stringify(resposta.data.users));
          alert("recado apagado")
          location.reload();
          ImprimirDados()
      });
        });
   }

   

   function modalAtualizarRecado(idRecado) {
      let idUsuario = "";
      for (let usuarioX=0; usuarioX < usuariosFormatados.length; usuarioX++) {
        for(let recadoY=0; recadoY < usuariosFormatados[usuarioX].recados.length; recadoY++) {
          if(idRecado === usuariosFormatados[usuarioX].recados[recadoY].recadoId) {
            idUsuario = usuariosFormatados[usuarioX].userId;
            document.getElementById("inputDescricaoModal").value = usuariosFormatados[usuarioX].recados[recadoY].descricao;
            document.getElementById("inputDetalhamentoModal").value =usuariosFormatados[usuarioX].recados[recadoY].detalhe;
            
            localStorage.setItem("modalIdUsuario", JSON.stringify(idUsuario));
            localStorage.setItem("modalIdRecado", JSON.stringify(idRecado));
          }
        } 
      }
   }

   function editarRecado() {

    let usuario = localStorage.getItem("modalIdUsuario");
    let usuarioFormatadoId = JSON.parse(usuario);

    let recado = localStorage.getItem("modalIdRecado");
    let recadoFormatadoId = JSON.parse(recado);

    axios.put(`https://thiago-recados-b.herokuapp.com/users/${usuarioFormatadoId}/recados/${recadoFormatadoId}`, {
      descricao: document.getElementById("inputDescricaoModal").value,
      detalhe: document.getElementById("inputDetalhamentoModal").value
    }).then(retorno => {
        axios.get('https://thiago-recados-b.herokuapp.com/users')
        .then(resposta => {
        localStorage.setItem("ListaDeUsuarios", JSON.stringify(resposta.data.users));
        location.reload();
        ImprimirDados()
        });
      });
  }
   
                 
