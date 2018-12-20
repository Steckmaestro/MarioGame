export function createDashboardLayer(font, playerEnv) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  const score = "000000";
  const coins = "10";

  return function drawDashboard(context) {
    const time = playerEnv.playercontroller.time;

    font.print("MARIO", context, 16, LINE1);
    font.print(score, context, 16, LINE2);

    font.print("@x" + coins.toString().padStart(2, 0), context, 100, LINE2);

    font.print("WORLD", context, 152, LINE1);
    font.print("1-1", context, 160, LINE2);
    font.print("TIME", context, 200, LINE1);
    font.print(time.toFixed().toString(), context, 200, LINE2);
  };
}
