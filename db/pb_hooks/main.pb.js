routerAdd("GET", "/api/splt/transactions", (c) => {
  const groupId = c.queryParam("groupId");

  const expenses = $app.dao().findRecordsByFilter(
    "expenses",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    0,
    0,
    { groupId: groupId }
  );

  const paybacks = $app.dao().findRecordsByFilter(
    "paybacks",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(paybacks, ["fromPerson", "toPerson"]);
  $app.dao().expandRecords(expenses, ["paidBy"]);

  const notSortedTransactions = [...expenses, ...paybacks];

  return c.json(200, {
    transactions: notSortedTransactions,
  });
});

routerAdd("GET", "/api/splt/expense", (c) => {
  const expenseId = c.queryParam("expenseId");

  const expenseOriginal = $app.dao().findRecordById("expenses", expenseId);
  $app.dao().expandRecord(expenseOriginal, [
    "participants",
    "paidBy",
    "groupInfo",
    "groupInfo.participants",
  ]);

  // Fetch group directly (same pattern as original) to safely count participants
  const groupRecord = $app
    .dao()
    .findRecordById("groups", expenseOriginal.get("groupInfo"));

  const expense = expenseOriginal.publicExport();
  const totalAmount = expenseOriginal.get("amount");
  const splitType = expenseOriginal.get("splitType");
  const everyoneIsParticipant = expenseOriginal.get("everyoneIsParticipant");
  const numGroupParticipants = groupRecord.get("participants").length;
  const numExpenseParticipants = expenseOriginal.get("participants").length;

  let amountPerPerson = 0;
  let participantAmounts = {}; // { participantId: amount } — populated for part/amount types
  let rawSplits = []; // [{ participantId, part, amount }] — original split records

  if (splitType === "part" || splitType === "amount") {
    const splits = $app.dao().findRecordsByFilter(
      "splits",
      "expenseId = {:expenseId}",
      "",
      0,
      0,
      { expenseId: expenseId }
    );

    splits.forEach((split) => {
      const s = JSON.parse(JSON.stringify(split));
      rawSplits.push({ participantId: s.participantId, part: s.part, amount: s.amount });
    });

    if (splitType === "part") {
      let totalParts = 0;
      rawSplits.forEach((s) => { totalParts += s.part || 0; });
      rawSplits.forEach((s) => {
        participantAmounts[s.participantId] =
          totalParts > 0 ? totalAmount * ((s.part || 0) / totalParts) : 0;
      });
    } else {
      // amount — use stored value directly
      rawSplits.forEach((s) => {
        participantAmounts[s.participantId] = s.amount || 0;
      });
    }

    // amountPerPerson kept as equal fallback for legacy callers
    amountPerPerson = everyoneIsParticipant
      ? totalAmount / numGroupParticipants
      : totalAmount / numExpenseParticipants;
  } else {
    // equal
    amountPerPerson = everyoneIsParticipant
      ? totalAmount / numGroupParticipants
      : totalAmount / numExpenseParticipants;
  }

  return c.json(200, { ...expense, amountPerPerson, participantAmounts, splits: rawSplits });
});

// POST /api/splt/expense — create expense + splits atomically
routerAdd("POST", "/api/splt/expense", (c) => {
  const data = $apis.requestInfo(c).data;

  const expCollection = $app.dao().findCollectionByNameOrId("expenses");
  const expense = new Record(expCollection, {
    groupInfo: data.groupInfo,
    amount: data.amount,
    transactionDateTime: data.transactionDateTime,
    name: data.name,
    avatar: data.avatar,
    description: data.description,
    paidBy: data.paidBy,
    splitType: data.splitType,
    everyoneIsParticipant: data.everyoneIsParticipant,
    participants: data.participants,
  });
  $app.dao().saveRecord(expense);

  if (
    (data.splitType === "part" || data.splitType === "amount") &&
    data.splits
  ) {
    const splitsCollection = $app.dao().findCollectionByNameOrId("splits");
    data.splits.forEach((split) => {
      if (!split.participantId) return;
      const splitRecord = new Record(splitsCollection, {
        expenseId: expense.id,
        participantId: split.participantId,
        part: split.part != null ? split.part : null,
        amount: split.amount != null ? split.amount : null,
      });
      $app.dao().saveRecord(splitRecord);
    });
  }

  return c.json(200, expense);
});

// PATCH /api/splt/expense/:id — update expense + splits atomically
routerAdd("PATCH", "/api/splt/expense/:id", (c) => {
  const expenseId = c.pathParam("id");
  const data = $apis.requestInfo(c).data;

  const expense = $app.dao().findRecordById("expenses", expenseId);
  expense.set("groupInfo", data.groupInfo);
  expense.set("amount", data.amount);
  expense.set("transactionDateTime", data.transactionDateTime);
  expense.set("name", data.name);
  expense.set("avatar", data.avatar);
  expense.set("description", data.description);
  expense.set("paidBy", data.paidBy);
  expense.set("splitType", data.splitType);
  expense.set("everyoneIsParticipant", data.everyoneIsParticipant);
  expense.set("participants", data.participants);
  $app.dao().saveRecord(expense);

  // Replace splits: delete old, insert new
  const existingSplits = $app.dao().findRecordsByFilter(
    "splits",
    "expenseId = {:expenseId}",
    "",
    0,
    0,
    { expenseId: expenseId }
  );
  existingSplits.forEach((split) => $app.dao().deleteRecord(split));

  if (
    (data.splitType === "part" || data.splitType === "amount") &&
    data.splits
  ) {
    const splitsCollection = $app.dao().findCollectionByNameOrId("splits");
    data.splits.forEach((split) => {
      if (!split.participantId) return;
      const splitRecord = new Record(splitsCollection, {
        expenseId: expense.id,
        participantId: split.participantId,
        part: split.part != null ? split.part : null,
        amount: split.amount != null ? split.amount : null,
      });
      $app.dao().saveRecord(splitRecord);
    });
  }

  return c.json(200, expense);
});

// DELETE /api/splt/expense/:id — delete splits then expense atomically
routerAdd("DELETE", "/api/splt/expense/:id", (c) => {
  const expenseId = c.pathParam("id");

  const existingSplits = $app.dao().findRecordsByFilter(
    "splits",
    "expenseId = {:expenseId}",
    "",
    0,
    0,
    { expenseId: expenseId }
  );
  existingSplits.forEach((split) => $app.dao().deleteRecord(split));

  const expense = $app.dao().findRecordById("expenses", expenseId);
  $app.dao().deleteRecord(expense);

  return c.json(200, { id: expenseId });
});

routerAdd("GET", "/api/splt/payback", (c) => {
  const paybackId = c.queryParam("paybackId");

  const paybackOriginal = $app.dao().findRecordById("paybacks", paybackId);
  $app
    .dao()
    .expandRecord(paybackOriginal, ["fromPerson", "toPerson", "groupInfo"]);

  return c.json(200, paybackOriginal);
});

routerAdd("GET", "/api/splt/hasSpent", (c) => {
  const groupId = c.queryParam("groupId");

  const payBefore = $app.dao().findRecordsByFilter(
    "payBefore",
    "groupInfo = {:groupId}",
    "",
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(payBefore, ["paidBy"]);
  let hashMap = {};

  payBefore.forEach((pay) => {
    const parsed = JSON.parse(JSON.stringify(pay));
    const participant = parsed.expand.paidBy;
    const sumAmount = parsed.sumAmount;
    hashMap[participant.id] = {
      amount: sumAmount,
      ...participant,
    };
  });

  const expensesOriginal = $app.dao().findRecordsByFilter(
    "expenses",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(expensesOriginal, [
    "participants",
    "groupInfo.participants",
  ]);

  if (expensesOriginal.length === 0) {
    return c.json(200, []);
  }

  // Fetch all splits for this group's expenses and build a lookup map
  // { expenseId: { participantId: { part, amount } } }
  const allSplits = $app.dao().findRecordsByFilter(
    "splits",
    "expenseId.groupInfo = {:groupId}",
    "",
    0,
    0,
    { groupId: groupId }
  );
  const splitsMap = {};
  allSplits.forEach((split) => {
    const s = JSON.parse(JSON.stringify(split));
    if (!splitsMap[s.expenseId]) splitsMap[s.expenseId] = {};
    splitsMap[s.expenseId][s.participantId] = {
      part: s.part,
      amount: s.amount,
    };
  });

  expensesOriginal.forEach((expense) => {
    const parsed = JSON.parse(JSON.stringify(expense));
    const groupParticipants = parsed.expand.groupInfo.expand.participants;
    const numGroupParticipants = parsed.expand.groupInfo.participants.length;
    const expenseParticipants = parsed.expand.participants;
    const numExpenseParticipants = parsed.participants.length;
    const totalAmount = parsed.amount;
    const everyoneIsParticipant = parsed.everyoneIsParticipant;
    const splitType = parsed.splitType;
    const expenseSplits = splitsMap[parsed.id] || {};

    if (splitType === "part") {
      let totalParts = 0;
      Object.values(expenseSplits).forEach((s) => {
        totalParts += s.part || 0;
      });

      const participants = everyoneIsParticipant
        ? groupParticipants
        : expenseParticipants;
      participants.forEach((participant) => {
        if (!hashMap[participant.id]) {
          hashMap[participant.id] = { amount: 0, ...participant };
        }
        const s = expenseSplits[participant.id];
        const part = s ? s.part || 0 : 0;
        const owedAmount =
          totalParts > 0 ? totalAmount * (part / totalParts) : 0;
        hashMap[participant.id].amount -= owedAmount;
      });
    } else if (splitType === "amount") {
      const participants = everyoneIsParticipant
        ? groupParticipants
        : expenseParticipants;
      participants.forEach((participant) => {
        if (!hashMap[participant.id]) {
          hashMap[participant.id] = { amount: 0, ...participant };
        }
        const s = expenseSplits[participant.id];
        const owedAmount = s ? s.amount || 0 : 0;
        hashMap[participant.id].amount -= owedAmount;
      });
    } else {
      // equal (and legacy "percent")
      let amountPerPerson = 0;
      if (everyoneIsParticipant) {
        amountPerPerson = totalAmount / numGroupParticipants;
        groupParticipants.forEach((participant) => {
          if (!hashMap[participant.id]) {
            hashMap[participant.id] = { amount: 0, ...participant };
          }
          hashMap[participant.id].amount -= amountPerPerson;
        });
      } else {
        amountPerPerson = totalAmount / numExpenseParticipants;
        expenseParticipants.forEach((participant) => {
          if (!hashMap[participant.id]) {
            hashMap[participant.id] = { amount: 0, ...participant };
          }
          hashMap[participant.id].amount -= amountPerPerson;
        });
      }
    }
  });

  let haveTopay = [];
  let sortedArray = Object.entries(hashMap).sort(
    (a, b) => a[1].amount - b[1].amount
  );
  while (true) {
    const sortedObject = Object.fromEntries(sortedArray);
    sortedArray = Object.entries(sortedObject).sort(
      (a, b) => a[1].amount - b[1].amount
    );
    const highestDebtie = sortedArray[0];
    const highestGiver = sortedArray[sortedArray.length - 1];
    const rest = highestGiver[1].amount + highestDebtie[1].amount;
    if (highestGiver[1].amount <= 0.01) {
      break;
    }
    if (rest < 0) {
      haveTopay.push({
        fromPerson: { id: highestDebtie[0], ...highestDebtie[1] },
        toPerson: { id: highestGiver[0], ...highestGiver[1] },
        amount: highestGiver[1].amount,
      });
      sortedArray[sortedArray.length - 1][1].amount = 0;
      sortedArray[0][1].amount = rest;
    } else {
      haveTopay.push({
        fromPerson: { id: highestDebtie[0], ...highestDebtie[1] },
        toPerson: { id: highestGiver[0], ...highestGiver[1] },
        amount: -highestDebtie[1].amount,
      });
      sortedArray[sortedArray.length - 1][1].amount = rest;
      sortedArray[0][1].amount = 0;
    }
  }

  const paybacks = $app.dao().findRecordsByFilter(
    "paybacks",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    0,
    0,
    { groupId: groupId }
  );

  paybacks.forEach((payback) => {
    const parsed = JSON.parse(JSON.stringify(payback));
    const fromPersonId = parsed.fromPerson;
    const toPersonId = parsed.toPerson;
    const amount = parsed.amount;
    haveTopay.forEach((pay) => {
      if (
        pay.fromPerson.id === fromPersonId &&
        pay.toPerson.id === toPersonId
      ) {
        pay.amount -= amount;
      }

      if (pay.amount < 0.01) {
        haveTopay.splice(haveTopay.indexOf(pay), 1);
      }
    });
  });

  return c.json(200, haveTopay);
});

onModelAfterUpdate((e) => {
  console.log("user updated...", e.model.get("email"));
}, "users");

onAfterBootstrap((e) => {
  console.log("App initialized!");
});
