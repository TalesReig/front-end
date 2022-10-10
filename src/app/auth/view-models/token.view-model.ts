export class TokenViewModel {
  chave: string;
  dataExpiracao: Date;

  usuarioToken: UsuarioTokenViewModel;
}


export class UsuarioTokenViewModel {
  id: string;
  email: string;
  nome: string;
}
