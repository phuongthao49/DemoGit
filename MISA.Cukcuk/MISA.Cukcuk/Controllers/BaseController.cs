using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.Bussiness.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Controllers
{
    /// <summary>
    /// API dùng chung
    /// </summary>
    /// <typeparam name="T">Đối tượng tương ứng truyền vào</typeparam>
    /// Author: LTPTHAO (25/10/2020)
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase
    {
        IBaseService<T> _baseService;

        #region "contructor"
        public BaseController(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        #endregion "contructor"

        #region "method"
        /// <summary>
        /// Lấy danh sách entity
        /// </summary>
        /// <returns></returns>
        /// Author: LTPTHAO (25/10/2020)
        // GET: api/<BaseController>
        [HttpGet]
        public IActionResult Get()
        {
            var result = _baseService.Get();
            if (result != null)
                return Ok(result);
            return NoContent();
        }

        /// <summary>
        /// Lấy ra 1 entity theo Id
        /// </summary>
        /// <param name="id">id của entity</param>
        /// <returns></returns>
        /// Author: LTPTHAO (25/11/2020)
        // GET api/<BaseController>/5
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute]Guid id)
        {
            var entity = _baseService.GetById(id);
            if (entity != null)
                return Ok(entity);
            return NoContent();
        }

        /// <summary>
        /// Thêm mới 1 entity
        /// </summary>
        /// <param name="entity">Entity thêm mới</param>
        /// Author: LTPTHAO (25/10/2020)
        // POST api/<BaseController>
        [HttpPost]
        public IActionResult Post([FromBody] T entity)
        {
            var serviceResponse = _baseService.Insert(entity);
            var effectRow = serviceResponse.ToString() != null ? (int)serviceResponse : 0;
            if (effectRow > 0)
                return CreatedAtAction("POST", effectRow);
            return BadRequest(serviceResponse);
        }

        /// <summary>
        /// Sửa 1 entity
        /// </summary>
        /// <param name="entity">entity cần edit</param>
        /// <param name="id">id của entity cần edit</param>
        /// Author: LTPTHAO (25/10/2020)
        // PUT api/<BaseController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] T entity, Guid id)
        {
            var effectRow = _baseService.Update(entity, id);
            if (effectRow > 0)
                return CreatedAtAction("PUT", effectRow);
            else
                return BadRequest();
        }


        /// <summary>
        /// Xóa 1 nhân viên theo id
        /// </summary>
        /// <param name="entityId">id của entity</param>
        /// Author: LTPTHAO
        // DELETE api/<BaseController>/5
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            var effectRow = _baseService.Delete(entityId);
            if (effectRow > 0)
                return CreatedAtAction("DELETE", effectRow);
            else
                return BadRequest();
        }
        #endregion "method"
    }
}
