$(document).on("click","#save",function(){
    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

    if(jQuery.inArray(extensao_imagem, ['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }
    else{
        var form_data = new FormData();
        form_data.append('foto',prop);
        form_data.append('livro',$('#livro').val());
        form_data.append('autor',$('#autor').val());
        form_data.append('ano',$('#ano').val());

        $.ajax({
            url:"https://pratilheira-online.000webhostapp.com/cadastra.php",//para onde enviar
            method:'POST', //como enviar
            data:form_data,//o que enviar
            contentType:false,
            cache:false,
            processData:false,
            //se der certo
            success: function(data){
                navigator.notification.alert(data);
                location.reload();
            }
        });
    }
        
});

//Função para listar dados do BD
function listarLivros(){
   $.ajax({
        type:"post", //como enviar
        url:"https://pratilheira-online.000webhostapp.com/listar.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.livros,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.livro+"</option>"; 
            });
        var gambiarra = "<option selected disabled>Escolha um livro da lista</option>"+itemlista;
        $("#lista").html(gambiarra);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}

//Evento de click do botão listar um dado especifico do BD
$(document).on("change","#lista",function(){
    var codigoescolhido = $("option:selected", ("#lista")).val();
    $.ajax({
        type:"get", //como enviar
        url:"https://pratilheira-online.000webhostapp.com/listarum.php",//para onde enviar
        data:"id="+codigoescolhido,
        dataType:"json",
        //se der certo
        success: function(data){
            $("#codigo").val(data.livros.codigo);
            $("#livro1").val(data.livros.livro);
            $("#autor1").val(data.livros.autor);
            $("#ano1").val(data.livros.ano);
            $("#imagem").attr('src',"https://pratilheira-online.000webhostapp.com/"+data.livros.imagem);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

//Evento de click do botão de deletar dados do BD
$(document).on("click","#delete",function(){
    $.ajax({
        type:"get", //como enviar
        url:"https://pratilheira-online.000webhostapp.com/delet.php",//para onde enviar
        data:"id="+$("#codigo").val(),
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();//recarrega a pagina
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});

//Atulizar alteração
$(document).on("click","#update",function(){
  var prop = document.getElementById('caminho1').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

   var form_data = new FormData();
        form_data.append('foto1',prop);
        form_data.append('codigo',$('#codigo').val());
        form_data.append('livro',$('#livro1').val());
        form_data.append('autor',$('#autor1').val());
        form_data.append('ano',$('#ano1').val());

    $.ajax({
        url:"https://pratilheira-online.000webhostapp.com/update.php",//para onde enviar
        method:'POST', //como enviar
            data:form_data,//o que enviar
            contentType:false,
            cache:false,
            processData:false,
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});

//Botao habilita input
$(document).on('click','.new',function(){
  habilita();
})
//Botao desabilita input
$(document).on('click','.cancel',function(){
  desabilita();
})
//Funcao habilita input
function habilita(){
  $("#livro").prop("readonly",false);
  $("#autor").prop("readonly",false);
  $("#ano").prop("readonly",false);
}
//Funcao desabilita input
function desabilita(){
  $("#livro").prop("readonly",true);
  $("#autor").prop("readonly",true);
  $("#ano").prop("readonly",true);
}

//Botao habilita input
$(document).on('click','#editar',function(){
  habilita1();
})
//Botao desabilita input
$(document).on('click','#cancelar',function(){
  desabilita1();
})
//Funcao habilita input
function habilita1(){
  $("#livro1").prop("readonly",false);
  $("#autor1").prop("readonly",false);
  $("#ano1").prop("readonly",false);
}
//Funcao desabilita input
function desabilita1(){
  $("#livro1").prop("readonly",true);
  $("#autor1").prop("readonly",true);
  $("#ano1").prop("readonly",true);
}

//Plugins

$(document).on('click','#camera', function(){
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URL });
    saveToPhotoToAlbum: true;
    correctOrientation: true;

  function onSuccess(imageData) {
      navigator.notification.alert('Sua foto foi hackeada');
  }

  function onFail(message) {
      navigator.notification.alert('Foto bugada: ' + message);
  }
});