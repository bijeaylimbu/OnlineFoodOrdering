using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "212c920f-f3e6-4b22-9d74-7c44f4c8b5b0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27933c51-ae29-4f65-8bcd-e9890acc003e");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ae9d263-5078-488d-8ba2-8de813652a12", "8aaa4b27-7bd0-4c05-be10-7c303a8571ea", "Viewer", "VIEWER" },
                    { "3ed2ecee-aeda-4120-bb97-23cfe0a1ad36", "e8d907a4-a056-4061-acba-b85733fb97a2", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ae9d263-5078-488d-8ba2-8de813652a12");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ed2ecee-aeda-4120-bb97-23cfe0a1ad36");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "212c920f-f3e6-4b22-9d74-7c44f4c8b5b0", "03cb2d14-4434-46cd-8054-6a824dbb88a3", "Viewer", "VIEWER" },
                    { "27933c51-ae29-4f65-8bcd-e9890acc003e", "29e153d9-fa5d-4ddb-b970-f5ead0c63b24", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
