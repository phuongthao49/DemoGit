using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Interfaces
{
    public interface IBaseService<T>
    {
        /// <summary>
        /// Lấy danh sách thông tin bản ghi
        /// </summary>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        IEnumerable<T> Get();
        T GetById(Guid entityId);
        int Insert(T entity);
        int Update(T entity, Guid id);
        int Delete(Guid entityId); 


    }
}
