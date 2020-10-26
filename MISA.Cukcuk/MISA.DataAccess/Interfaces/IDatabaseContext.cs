using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Interfaces
{
    /// <summary>
    /// Lớp interface database
    /// </summary>
    /// Author: LTPTHAO (25/10/2020)
    /// <typeparam name="T"></typeparam>
    public interface IDatabaseContext<T>
    {
        IEnumerable<T> Get();
       
        object Get(string storeName, string code);
        T GetById(object employeeId);
        int Insert(T employee);
        int Update(T employee, Guid id);
        int Delete(object id);

        object ExecuteScalar(string storeName);
    }
}
