using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class removingProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Cart_CartItemId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CartItemId",
                table: "Product");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05184ffc-8b0f-499a-a176-bc673f7b386a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ece278d9-ea17-426c-9e41-83febe181896");

            migrationBuilder.DropColumn(
                name: "CartItemId",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Cart",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38d70dba-fbcf-44d1-9713-8336fa07c5d6", "cd730219-796b-47ee-9e07-46f52d07bc70", "Viewer", "VIEWER" },
                    { "66da4288-5e22-4a68-af21-38b77edbe6c2", "d470cc6f-4e7b-4630-809c-dd4dc337d658", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38d70dba-fbcf-44d1-9713-8336fa07c5d6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "66da4288-5e22-4a68-af21-38b77edbe6c2");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Cart");

            migrationBuilder.AddColumn<int>(
                name: "CartItemId",
                table: "Product",
                type: "integer",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05184ffc-8b0f-499a-a176-bc673f7b386a", "47d3adfe-df92-454e-97ee-160671734242", "Viewer", "VIEWER" },
                    { "ece278d9-ea17-426c-9e41-83febe181896", "65d613a9-8afc-46b8-bbf3-e3add7634251", "Administrator", "ASMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_CartItemId",
                table: "Product",
                column: "CartItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Cart_CartItemId",
                table: "Product",
                column: "CartItemId",
                principalTable: "Cart",
                principalColumn: "Id");
        }
    }
}
