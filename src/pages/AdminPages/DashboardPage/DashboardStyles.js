const pieColors = ["#1b0099", "#6200ee", "#aa00ff", "#d500f9", "#ff4081"];

const styles = {
  statCard: (color) => ({
    flex: "1 1 20%",
    minWidth: 200,
    height: 80,
    bgcolor: `${color}22`,
    borderRadius: 3,
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: 1,
  }),
  statCardValue: (color) => ({
    fontWeight: "bold",
    color,
  }),

  statCardTitle: {
    fontWeight: "500",
    fontSize: 14,
  },

  statCardGrowthText: {
    fontSize: 13,
    color: "#777",
  },

  statCardGrowthHighlight: {
    color: "green",
    fontWeight: "bold",
  },

  chartCard: {
    width: 1100,
    p: 2,
    mb: 3,
    borderRadius: "16px",
    mx: "auto",
  },

  chartCardTitle: {
    color: "#1b0099",
    mb: 2,
    fontWeight: "bold",
  },

  mainContainer: {
    p: 2,
    bgcolor: "#f9f9ff",
    maxWidth: "100vw",
  },

  statsWrapper: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
    flexWrap: "nowrap",
    maxWidth: 1300,
    mx: "auto",
    mb: 3,
  },

  chartsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 1200,
    maxHeight: 450,
    mx: "auto",
    position: "relative",
  },

  iconButtonPrev: {
    position: "absolute",
    left: -50,
    bgcolor: "#1b0099",
    color: "#fff",
    "&:hover": { bgcolor: "#120070" },
  },

  iconButtonNext: {
    position: "absolute",
    right: -50,
    bgcolor: "#1b0099",
    color: "#fff",
    "&:hover": { bgcolor: "#120070" },
  },

  pieContainer: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    maxHeight: "300px",
  },

  pieBox: {
    flex: "1 1 100%",
  },

  pieChartLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },

  pieChartLabelTextProps: (color) => ({
    fill: color,
    textAnchor: "start",
    dominantBaseline: "middle",
  }),
};

export { pieColors };
export default styles;
