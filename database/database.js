const mysql = require("mysql2");

class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }
  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: "132.226.245.178",
      database: "PFS1_10442521489",
      user: "10442521489",
      password: "10442521489",
      idleTimeout: 30000,
      connectionLimit: 50,
      //DATE/DATETIME voltam como texto ("2026-10-08"), sem conversao de fuso
      dateStrings: true,
    });
  }

  ExecutaComando(sql, valores) {
    //select
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results);
      });
    });
  }

  ExecutaComandoNonQuery(sql, valores) {
    //insert, update, delete
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.affectedRows > 0);
      });
    });
  }

  //executa a funcao dentro de uma transacao: se ela lancar erro, desfaz tudo.
  //a funcao recebe executar(sql, valores), que devolve o resultado do comando
  async ExecutaTransacao(funcao) {
    const cnn = await this.#conexao.promise().getConnection();
    try {
      await cnn.beginTransaction();
      const executar = async (sql, valores) => (await cnn.query(sql, valores))[0];
      const resultado = await funcao(executar);
      await cnn.commit();
      return resultado;
    } catch (error) {
      await cnn.rollback();
      throw error;
    } finally {
      cnn.release();
    }
  }

  ExecutaComandoLastInserted(sql, valores) {
    //comandos insert
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.insertId);
      });
    });
  }
}

module.exports = Database;
