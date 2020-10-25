using MISA.DataAccess.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.DataAccess.DatabaseAccess
{
    public class DatabaseContext<T>: IDisposable, IDatabaseContext<T>
    {
        readonly string _connectionString = "Server=35.194.166.58;Port=3306;Database=MISACukCuk_F09_LTPTHAO;Uid=nvmanh;Pwd=12345678@Abc;";
        MySqlConnection _mySqlConnection;
        MySqlCommand _mySqlCommand;

        #region "contructor"
        public DatabaseContext()
        {
            //Khởi tạo đối tượng mysql connection kết nối cơ sở dữ liệu
            _mySqlConnection = new MySqlConnection(_connectionString);
            //Mở kết nối Database
            _mySqlConnection.Open();
            //Khởi tạo đối tượng sql command cho phép thao tác với dữ liệu
            _mySqlCommand = _mySqlConnection.CreateCommand();
            //kiểu tương tác với procedure
            _mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        }
        #endregion 
        #region "method"
        /// <summary>
        /// Lấy dữ liệu của nhân viên
        /// </summary>
        /// <returns>Employees</returns>
        /// Created by: LTPThao (19/10/2020)
        public IEnumerable<T> Get()
        {
            var entities = new List<T>();
            var className = typeof(T).Name;
            //Kiểu khai báo truy vấn
            _mySqlCommand.CommandText = $"Proc_Get{className}s";
            //Thực thi công việc với Database
            MySqlDataReader mySqlDataReader = _mySqlCommand.ExecuteReader();
            //Xử lý dữ liệu trả về
            while (mySqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    //lấy tên cột hiện tại
                    var colName = mySqlDataReader.GetName(i);
                    //lấy giá trị cột hiện tại
                    var value = mySqlDataReader.GetValue(i);
                    //lấy ra property giống với tên cột đã được khai báo
                    var property = entity.GetType().GetProperty(colName); //Cú pháp lấy theo tên
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(entity, value);
                    }
                }
                // Thêm đôi tượng khách hàng vừa build được vào list:
                entities.Add(entity);
            }
            return entities;
        }


        /// <summary>
        /// Lấy thông tin nhân viên theo mã nhân viên.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// Created by: LTPThao (19/10/2020)
        public T GetById(object id)
        {
            var employees = new List<T>();
            var className = typeof(T).Name;
            _mySqlCommand.CommandText = $"Proc_Get{className}ById";
            _mySqlCommand.Parameters.AddWithValue("@EmployeeId", id);
            MySqlDataReader mySqlDataReader = _mySqlCommand.ExecuteReader();
            //Xử lý dữ liệu trả về
            while (mySqlDataReader.Read())
            {
                var employee = Activator.CreateInstance<T>();
                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    var colName = mySqlDataReader.GetName(i);
                    var value = mySqlDataReader.GetValue(i);
                    var property = employee.GetType().GetProperty(colName);
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(employee, value);
                    }
                }
                return employee;
            }
            return default;
        }

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// Created by: LTPThao (19/10/2020)
        public int Insert(T entity)
        {
            var entityName = typeof(T).Name;
            _mySqlCommand.Parameters.Clear();
            _mySqlCommand.CommandText = $"Proc_Insert{entityName}";
            MySqlCommandBuilder.DeriveParameters(_mySqlCommand);
            var parameters = _mySqlCommand.Parameters;
            var properties = typeof(T).GetProperties();

            foreach (MySqlParameter param in parameters)
            {
                var paramName = param.ParameterName.Replace("@", string.Empty);
                var property = entity.GetType().GetProperty(paramName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (property != null)
                    param.Value = property.GetValue(entity);
            }

            //Thực thi công việc
            var result = _mySqlCommand.ExecuteNonQuery();
            return result;


        }

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employee"></param>
        /// <returns></returns>
        /// Created by: LTPThao (19/10/2020)
        public int Update(T employee, Guid id)
        {
            // lấy dữ liệu từ database;
            var entityName = typeof(T).Name;
            _mySqlCommand.CommandText = $"Proc_Update{entityName}";
            _mySqlCommand.Parameters.AddWithValue($"@{entityName}Id", id);
            MySqlCommandBuilder.DeriveParameters(_mySqlCommand);
            var parameters = _mySqlCommand.Parameters;
            var properties = typeof(T).GetProperties();
            foreach (MySqlParameter param in parameters)
            {
                var paramName = param.ParameterName.Replace("@", string.Empty);
                var property = employee.GetType().GetProperty(paramName);
                if (paramName == $"{entityName}Id")
                    param.Value = id;
                else if (property != null)
                    param.Value = property.GetValue(employee);
            }
            var affectRows = _mySqlCommand.ExecuteNonQuery();
            return affectRows;
        }

        /// <summary>
        /// Xóa dữ liệu theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// Created by: LTPThao (19/10/2020)
        public int Delete(object id)
        {
            var entityName = typeof(T).Name;
            _mySqlCommand.Parameters.Clear();
            _mySqlCommand.CommandText = $"Proc_Delete{entityName}ById";
            //_sqlCommand.Parameters.AddWithValue($"@{entityName}Id", id);
            MySqlCommandBuilder.DeriveParameters(_mySqlCommand);
            if (_mySqlCommand.Parameters.Count > 0)
            {
                _mySqlCommand.Parameters[0].Value = id;
            }
            var affectRows = _mySqlCommand.ExecuteNonQuery();
            return affectRows;
        }

        /// <summary>
        /// Hàm đóng dữ liệu kết nối
        /// </summary>
        public void Dispose()
        {
            _mySqlConnection.Close();
        }

        public bool CheckEmployeeByCode(string employeeCode)
        {
            throw new NotImplementedException();
        }

        public object Get(string storeName, string code)
        {
            throw new NotImplementedException();
        }

        #endregion "method"

    }
}
