using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingPriceInProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38d70dba-fbcf-44d1-9713-8336fa07c5d6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "66da4288-5e22-4a68-af21-38b77edbe6c2");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "Cart",
                newName: "Quantity");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Cart",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "468c2d8d-d79a-4bc8-b51b-6ce910161862", "33f1822a-2f84-4adf-a07c-203f64da7414", "Viewer", "VIEWER" },
                    { "de207088-913f-49ce-8946-1353f7f42dc4", "322a84c5-78f0-4bae-bf71-2bb2e6aa6d02", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "468c2d8d-d79a-4bc8-b51b-6ce910161862");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de207088-913f-49ce-8946-1353f7f42dc4");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Cart");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Cart",
                newName: "quantity");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38d70dba-fbcf-44d1-9713-8336fa07c5d6", "cd730219-796b-47ee-9e07-46f52d07bc70", "Viewer", "VIEWER" },
                    { "66da4288-5e22-4a68-af21-38b77edbe6c2", "d470cc6f-4e7b-4630-809c-dd4dc337d658", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
