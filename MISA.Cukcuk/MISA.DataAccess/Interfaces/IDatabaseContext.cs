using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Interfaces
{
    public interface IDatabaseContext<T>
    {
        IEnumerable<T> Get();
        object Get(string storeName, string code);
        T GetById(object employeeId);
        int Insert(T employee);
        int Update(T employee, Guid id);
        int Delete(object id);
    }
}
