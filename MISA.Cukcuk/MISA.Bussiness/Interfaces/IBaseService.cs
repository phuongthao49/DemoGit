using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Interfaces
{
    public interface IBaseService<T>
    {
        #region "method"
        /// <summary>
        /// Lấy danh sách thông tin bản ghi
        /// </summary>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        IEnumerable<T> Get();
        /// <summary>
        /// Lấy entity theo ID
        /// </summary>
        /// <param name="entityId">Id của entity được chọn</param>
        /// <returns></returns>
        /// Author: LTPThao (25/20/2020)
        T GetById(Guid entityId);
        /// <summary>
        /// Thêm entity mới
        /// </summary>
        /// <param name="entity">entity được thêm</param>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        int Insert(T entity);
        /// <summary>
        /// Sửa 1 entity
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="id">id entity được sửa</param>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        int Update(T entity, Guid id);
        /// <summary>
        /// Xóa 1 entity theo id
        /// </summary>
        /// <param name="entityId">lấy id được xóa</param>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        int Delete(Guid entityId);

#endregion "method"
    }
}
