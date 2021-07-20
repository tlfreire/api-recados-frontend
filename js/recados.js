
window.addEventListener('load', () => {
  axios.get('https://thiago-recados-b-novo.herokuapp.com/recados')
      .then(resposta => {
          localStorage.setItem("ListaRecados", JSON.stringify(resposta.data));

      });
  });
  

let usuariosLS = localStorage.getItem("ListaDeUsuarios");
let usuariosFormatados = JSON.parse(usuariosLS);

let usuarioLogadoLS = localStorage.getItem("UsuarioLogado");
let usuarioLogadoFormatados = JSON.parse(usuarioLogadoLS);

    function ImprimirDados() {
        const dados = document.getElementById("corpo");
        let novoConteudo = "";
        
        const recadosLS = localStorage.getItem("ListaRecados");
          const listadeRecados = JSON.parse(recadosLS);

        for (const recado of listadeRecados) {
          novoConteudo += `
               <tr>
                  <td></td>
                  <td>${recado.descricao}</td>
                  <td>${recado.detalhe}</td>
                  <td><button type="button" onclick='modalAtualizarRecado("${recado.id}")' class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Editar</button>
                  <button type="button" onclick='apagarRecado("${recado.id}")' class="btn btn-primary">Apagar</button></td>
              </tr>
               `;
        }
        
          novoConteudo += "</tbody> </table>";
          dados.innerHTML = novoConteudo;
      }
      
    ImprimirDados()

    function salvarDetalhe() {
   
      let inputDescricao = document.getElementById("inputDescricao").value;
      let inputDetalhamento = document.getElementById("inputDetalhamento").value;

        axios.post(`https://thiago-recados-b-novo.herokuapp.com/user/${usuarioLogadoFormatados.id}/recados`, {
          descricao: inputDescricao,
          detalhe: inputDetalhamento
       }).then(retorno => {
        axios.get('https://thiago-recados-b-novo.herokuapp.com/recados')
        .then(resposta => {
        localStorage.setItem("ListaRecados", JSON.stringify(resposta.data));
        location.reload();
        ImprimirDados()
        });
      });
  }

   
   
    function apagarRecado(idRecado) {

       axios.delete(`https://thiago-recados-b-novo.herokuapp.com/recados/${idRecado}`)
       .then(resposta => {
      
           alert("recado apagado")
           location.reload();
           ImprimirDados()
       });
    }

   

    function modalAtualizarRecado(idRecado) {
      const recadosLS = localStorage.getItem("ListaRecados");
      const listadeRecados = JSON.parse(recadosLS);
      for (const recado of listadeRecados) {
        if (idRecado == recado.id) {
          localStorage.setItem("IdRecado", recado.id);
          document.getElementById("inputDescricaoModal").value = recado.descricao;
          document.getElementById("inputDetalhamentoModal").value = recado.detalhe;
        }
      }
    }

    function editarRecado() {
      const idRecado = localStorage.getItem("IdRecado")
     axios.put(`https://thiago-recados-b-novo.herokuapp.com/recados/${idRecado}`, {
       descricao: document.getElementById("inputDescricaoModal").value,
       detalhe: document.getElementById("inputDetalhamentoModal").value
     }).then(retorno => {
         axios.get('https://thiago-recados-b-novo.herokuapp.com/recados')
         .then(resposta => {
         localStorage.setItem("ListaRecados", JSON.stringify(resposta.data));
         location.reload();
         ImprimirDados()
         });
       });
   }
   
                 
